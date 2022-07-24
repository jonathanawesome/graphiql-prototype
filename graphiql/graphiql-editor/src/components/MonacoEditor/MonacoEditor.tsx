import { useEffect, useRef } from 'react';
import { editor as MONACO_EDITOR } from 'monaco-editor';

// constants
import { editorOptions } from '../../constants';

// hooks
import { useGraphiQLEditor, useGraphiQLSchema } from '../../hooks';
import type { MonacoEditorTypes } from '../../hooks';

// styles
import { MonacoEditorStyled, MonacoWrap } from './styles';

const addMonacoEditor = useGraphiQLEditor.getState().addMonacoEditor;
const runOperationAction = useGraphiQLSchema.getState().runOperationAction;
const updateOperationDefinitionFromModelValue =
  useGraphiQLEditor.getState().updateOperationDefinitionFromModelValue;

export const MonacoEditor = ({
  editorType,
  optionOverrides,
}: {
  editorType: MonacoEditorTypes;
  optionOverrides?: MONACO_EDITOR.IStandaloneEditorConstructionOptions;
}) => {
  const editorRef = useRef(null);

  const { monacoEditors } = useGraphiQLEditor();

  const monacoEditor = monacoEditors.find((e) => e.name === editorType);

  // console.log('rendering MonacoEditor', {
  //   editorType,
  //   editorTab,
  // });

  useEffect(() => {
    if (!monacoEditor) {
      const editor = MONACO_EDITOR.create(
        editorRef.current as unknown as HTMLDivElement,
        {
          language: editorType === 'operations' ? 'graphql' : 'json',
          ...editorOptions, // spread our base options
          ...(optionOverrides && optionOverrides), // spread any option overrides that were passed in
          fixedOverflowWidgets: true,
        }
      );

      // add this editor to our editors state array
      addMonacoEditor({
        editor,
        name: editorType,
      });

      // add the runOperationAction to the operation and variables editors
      if (editorType !== 'results') {
        editor.addAction(runOperationAction());
        // when our operation or variables editor models change, update the operationDefinition
        editor.onDidChangeModelContent(() => {
          updateOperationDefinitionFromModelValue({ value: editor.getValue() });
        });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MonacoEditorStyled>
      <MonacoWrap ref={editorRef} editorType={editorType} />
    </MonacoEditorStyled>
  );
};
