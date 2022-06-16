import { useEffect, useRef } from 'react';
import { editor as MONACO_EDITOR } from 'monaco-editor';

/** constants */
import { editorOptions, editorTheme } from '../../constants';

/** hooks */
import { useGraphiQLEditor } from '../../hooks';
import type { MonacoEditorTypes } from '../../hooks';

/** styles */
import { EditorStyled, MonacoWrap } from './styles';

const addMonacoEditor = useGraphiQLEditor.getState().addMonacoEditor;
const runOperationAction = useGraphiQLEditor.getState().runOperationAction;
const updateOperationDefinitionFromModelValue =
  useGraphiQLEditor.getState().updateOperationDefinitionFromModelValue;

export const MonacoEditor = ({
  editorType,
  model,
  optionOverrides,
}: {
  editorType: MonacoEditorTypes;
  model: MONACO_EDITOR.ITextModel;
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
          language: editorType === 'operation' ? 'graphql' : 'json',
          model,
          ...editorOptions, // spread our base options
          ...(optionOverrides && optionOverrides), // spread any option overrides that were passed in
        }
      );

      // add this editor to our editors state array
      addMonacoEditor({
        editor,
        name: editorType,
      });

      // listen for changes to the model content only on the operation editor
      if (editorType === 'operation') {
        editor.onDidChangeModelContent(() => {
          // when our operation editor model changes, update the operationDefinition
          updateOperationDefinitionFromModelValue({ value: editor.getValue() });
        });
      }

      // add the runOperationAction to the operation and variables editors
      if (editorType !== 'results') {
        editor.addAction(runOperationAction());
      }

      MONACO_EDITOR.defineTheme('myTheme', editorTheme);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorStyled>
      <MonacoWrap ref={editorRef} editorType={editorType} />
    </EditorStyled>
  );
};
