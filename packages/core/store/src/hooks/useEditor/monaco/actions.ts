import { editor as MONACO_EDITOR } from 'monaco-editor/esm/vs/editor/editor.api';
import type { DefinitionNode, Location } from 'graphql';
import type { IRange } from 'monaco-editor';

// constants
import { editorOptions } from '../../../constants';

// hooks
import { useSchema } from '../../useSchema';

// types
import { GetEditorStore, SetEditorStore } from '../types';
import { MonacoActions } from './types';
import { parseQuery } from '@graphiql-prototype/utils';

const getLocationAndRangeForDefinition = ({
  definition,
}: {
  definition: DefinitionNode;
}): { range: IRange; startLine: number; endLine: number } => {
  const location = definition.loc as Location;
  const startLine = location.startToken.line;
  const endLine = location.endToken.line;
  const range = {
    startColumn: location.startToken.column,
    endColumn: location.endToken.column + 1,
    startLineNumber: startLine,
    endLineNumber: endLine,
  };
  return { range, startLine, endLine };
};

export const monacoActions = (
  get: GetEditorStore,
  set: SetEditorStore
): MonacoActions => ({
  addMonacoEditor: ({ editor, name }) => {
    // console.log('running addMonacoEditor', { editor, name });

    const monacoEditors = get().monacoEditors;

    set({
      monacoEditors: {
        ...monacoEditors,
        ...(!monacoEditors[name] && { [name]: editor }),
      },
    });
  },
  initMonacoEditor: ({ monacoEditorType, monacoEditorRef, optionOverrides }) => {
    const monacoEditors = get().monacoEditors;
    const activeTab = get().getActiveTab();

    const updateOperationDefinitionFromModelValue =
      get().updateOperationDefinitionFromModelValue;

    const runOperationAction = useSchema.getState().runOperationAction;

    const editor = MONACO_EDITOR.create(monacoEditorRef, {
      language: monacoEditorType === 'operations' ? 'graphql' : 'json',
      // spread our base options
      ...editorOptions,
      // spread any option overrides that were passed in
      ...(optionOverrides && optionOverrides),
      fixedOverflowWidgets: true,
      model: monacoEditors[monacoEditorType]
        ? // if we have an editor of this type, we'll set the model
          activeTab[`${monacoEditorType}Model`]
        : //otherwise, we'll leave it undefined for now
          undefined,
    });

    // add this editor to our editors state array
    set({
      monacoEditors: {
        ...monacoEditors,
        [monacoEditorType]: editor,
      },
    });

    if (monacoEditorType !== 'results') {
      // add the runOperationAction to the operation and variables editors
      editor.addAction(runOperationAction());

      // when our operation or variables editor models change, update the operationDefinition
      editor.onDidChangeModelContent(() => {
        if (monacoEditorType === 'variables') {
          set({ activeVariables: editor.getValue() });
        }
        updateOperationDefinitionFromModelValue({ value: editor.getValue() });
      });

      // set the height of our editor
      editor.onDidContentSizeChange(() => {
        const contentHeight = editor.getContentHeight();
        if (monacoEditorRef) {
          monacoEditorRef.style.height = `${contentHeight}px`;
        }
      });
    }

    if (monacoEditorType === 'operations') {
      // set the initial "active" operation
      // get the ranges for each operation in the editor
      let newDecorations: any[] = [];
      let existingDecorations: any[] = [];
      let hasActiveDefinition = false;
      console.log('init', {
        newDecorations,
        existingDecorations,
      });

      editor.onDidChangeCursorPosition((event) => {
        // TODO: find a way to highlight the active operation...maybe it's a decoration/class?
        const modelValue = editor.getModel()?.getValue();
        // if the cursor position exists inside of an operation but outside of the current "active" operation, change the "active" operation
        if (modelValue) {
          const parsedQuery = parseQuery(modelValue);
          if (parsedQuery && !(parsedQuery instanceof Error)) {
            const definitionCount = parsedQuery.definitions.length;

            if (definitionCount > 1) {
              const cursorPosition = editor.getPosition();
              //map through the definitions and collect definition.loc.startToken.line & definition.loc.endToken.line
              [...parsedQuery.definitions].forEach((d) => {
                const { range, startLine, endLine } = getLocationAndRangeForDefinition({
                  definition: d,
                });

                if (
                  cursorPosition &&
                  cursorPosition.lineNumber >= startLine &&
                  cursorPosition.lineNumber <= endLine
                ) {
                  // if the cursor position exists within one of the definitions, it is the active definition
                  hasActiveDefinition = true;
                  // TODO: send this definition to the "activeDefinition" global state
                } else {
                  newDecorations.push({
                    range,
                    options: { inlineClassName: 'inactiveDefinition' },
                  });
                }
              });
              if (!hasActiveDefinition) {
                // our cursor is not within any of our definitions, so we want our first definition to be active
                // shift first definition from newDecorations
                const firstDefinition = newDecorations.shift();
                // TODO: send this definition to the "activeDefinition" global state
              }
              existingDecorations = editor.deltaDecorations(
                existingDecorations,
                newDecorations
              );
              // reset our newDecorations array
              newDecorations = [];
              // reset our
              hasActiveDefinition = false;
            } else {
              // we have one or less definitions, so we clear all decorations
              existingDecorations = editor.deltaDecorations(existingDecorations, []);
            }
            console.log('newDecorations', { newDecorations });
          } else {
            console.log('cannot parse query', { parsedQuery });
          }
        }
      });
    }
  },
});
