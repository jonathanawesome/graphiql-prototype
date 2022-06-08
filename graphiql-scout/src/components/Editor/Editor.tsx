import { useEffect, useRef } from 'react';
import { editor as monacoEditor } from 'monaco-editor';

/** constants */
import { editorOptions, editorTheme } from '../../constants';

/** hooks */
import { useGraphiQLScout } from '../../hooks';
import type { EditorTypes } from '../../hooks';

/** styles */
import { EditorStyled, MonacoWrap } from './styles';

export const Editor = ({
  editorType,
  initWithModel,
  optionOverrides,
}: {
  editorType: EditorTypes;
  initWithModel: monacoEditor.ITextModel;
  optionOverrides?: monacoEditor.IStandaloneEditorConstructionOptions;
}) => {
  const editorRef = useRef(null);

  const { activeScoutId, scouts, editors, addEditor, updateScoutData } =
    useGraphiQLScout();

  const editor = editors.find((e) => e.name === editorType);

  const scout = scouts.find((scout) => scout.scoutId === activeScoutId);

  useEffect(() => {
    if (editorType === 'results') {
      console.log('scout changing in editor', { editor, scout });
    }
    if (scout && editor) {
      const model = editor.editor.getModel();

      if (model && model.getValue() !== scout[editorType]) {
        model.pushEditOperations(
          [],
          [
            {
              range: model.getFullModelRange(),
              text: scout[editorType],
            },
          ],
          () => null
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scout]);

  console.log('rendering Editor', {
    editorType,
    editor,
  });

  useEffect(() => {
    if (!editor) {
      const newEditor = monacoEditor.create(
        editorRef.current as unknown as HTMLDivElement,
        {
          language: editorType === 'operation' ? 'graphql' : 'json',
          model: initWithModel,
          ...editorOptions, // spread our base options
          ...(optionOverrides && optionOverrides), // spread any option overrides that were passed in
        }
      );

      addEditor({
        editor: newEditor,
        name: editorType,
      });

      initWithModel.onDidChangeContent(() => {
        if (scout) {
          const editorValue = newEditor.getModel()?.getValue();
          console.log('updateScoutData', {
            type: editorType,
            editorValue,
            // newValue: newEditor.getModel().getValue(),
          });
          if (editorValue) {
            updateScoutData({
              type: editorType,
              newValue: editorValue,
            });
          }
        }
      });

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
