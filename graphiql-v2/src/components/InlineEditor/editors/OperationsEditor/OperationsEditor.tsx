import { useEffect, useRef } from 'react';
import { editor as monacoEditor } from 'monaco-editor';

/** constants */
import { editorOptions } from '../../../../constants';

/** hooks */
import { useGraphiQL } from '../../../../hooks';

/** styles */
import { EditorStyled, MonacoWrap } from './styles';

/** theme */
import { editorTheme } from '../../../../theme';

const editorType = 'operations';

export const OperationsEditor = ({
  initWithModel,
}: {
  initWithModel: monacoEditor.ITextModel;
}) => {
  const editorRef = useRef(null);
  const { activeTab, tabs, editors, addEditor } = useGraphiQL();

  const editor = editors.find((e) => e.name === editorType);

  const tab = tabs.find((tab) => tab.tabId === activeTab);

  useEffect(() => {
    if (tab && editor) {
      const model = editor.editor.getModel();
      if (model && tab.operations) {
        model.setValue(tab.operations);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  console.log('rendering OperationsEditor', {
    editor,
  });

  useEffect(() => {
    if (!editor) {
      const newEditor = monacoEditor.create(
        editorRef.current as unknown as HTMLDivElement,
        {
          ...editorOptions, // spread our base options
          language: 'graphql',
          model: initWithModel,
        }
      );

      addEditor({
        editor: newEditor,
        name: editorType,
      });

      initWithModel.onDidChangeContent(() => {
        valueSetter({ value: model.getValue() });
      });

      // if (action) {
      //   newEditor?.addAction(action);
      // }

      monacoEditor.defineTheme('myTheme', editorTheme);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorStyled>
      <MonacoWrap ref={editorRef} />
    </EditorStyled>
  );
};
