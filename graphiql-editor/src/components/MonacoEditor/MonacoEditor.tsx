import { useEffect, useRef } from 'react';
import { editor as MONACO_EDITOR } from 'monaco-editor';

/** constants */
import { editorOptions, editorTheme } from '../../constants';

/** hooks */
import { useGraphiQLEditor } from '../../hooks';
import type { MonacoEditorTypes } from '../../hooks';

/** styles */
import { EditorStyled, MonacoWrap } from './styles';

export const MonacoEditor = ({
  editorType,
  initWithModel,
  optionOverrides,
}: {
  editorType: MonacoEditorTypes;
  initWithModel: MONACO_EDITOR.ITextModel;
  optionOverrides?: MONACO_EDITOR.IStandaloneEditorConstructionOptions;
}) => {
  const editorRef = useRef(null);

  const {
    activeEditorTabId,
    editorTabs,
    monacoEditors,
    addMonacoEditor,
    updateEditorTabData,
  } = useGraphiQLEditor();

  const monacoEditor = monacoEditors.find((e) => e.name === editorType);

  const editorTab = editorTabs.find((editor) => editor.editorTabId === activeEditorTabId);

  // console.log('rendering MonacoEditor', {
  //   editorType,
  //   editorTab,
  // });

  useEffect(() => {
    if (editorTab && monacoEditor) {
      const model = monacoEditor.editor.getModel();

      if (model && model.getValue() !== editorTab[editorType]) {
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: editorTab[editorType],
            },
          ],
          () => null
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorTab]);

  useEffect(() => {
    if (!monacoEditor) {
      const newEditor = MONACO_EDITOR.create(
        editorRef.current as unknown as HTMLDivElement,
        {
          language: editorType === 'operation' ? 'graphql' : 'json',
          model: initWithModel,
          ...editorOptions, // spread our base options
          ...(optionOverrides && optionOverrides), // spread any option overrides that were passed in
        }
      );

      addMonacoEditor({
        editor: newEditor,
        name: editorType,
      });

      initWithModel.onDidChangeContent(() => {
        if (editorTab) {
          const editorValue = newEditor.getModel()?.getValue();
          if (editorValue) {
            updateEditorTabData({
              dataType: editorType,
              newValue: editorValue,
            });
          }
        }
      });

      MONACO_EDITOR.defineTheme('myTheme', editorTheme);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorStyled>
      <MonacoWrap ref={editorRef} />
    </EditorStyled>
  );
};
