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
        /** there's conflicting information about which of these options is "best", so leaving them both here. */
        /** begin option 1: execute edits through the editor
         * https://github.com/microsoft/monaco-editor/issues/1811#issuecomment-582612219
         * ! using option 1 doesn't update the results editor...leaving this code here for reference
         */
        // const selection = monacoEditor.editor.getSelection();
        // if (selection && model) {
        //   monacoEditor.editor.executeEdits('update-value', [
        //     {
        //       range: model.getFullModelRange(),
        //       text: editorTab[editorType],
        //       forceMoveMarkers: true,
        //     },
        //   ]);
        //   monacoEditor.editor.setSelection(selection);
        // }
        /** end option 1 */

        /** begin option 2: execute edits through the model
         * https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ITextModel.html#pushEditOperations
         */
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: editorTab[editorType],
              forceMoveMarkers: true,
            },
          ],
          () => []
        );
        /** end option 2 */
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorTab]);

  useEffect(() => {
    if (!monacoEditor) {
      const editor = MONACO_EDITOR.create(
        editorRef.current as unknown as HTMLDivElement,
        {
          language: editorType === 'operation' ? 'graphql' : 'json',
          model: initWithModel,
          ...editorOptions, // spread our base options
          ...(optionOverrides && optionOverrides), // spread any option overrides that were passed in
        }
      );

      addMonacoEditor({
        editor,
        name: editorType,
      });

      editor.onDidChangeModelContent(() => {
        updateEditorTabData({
          dataType: editorType,
          newValue: editor.getValue(),
        });
      });

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
