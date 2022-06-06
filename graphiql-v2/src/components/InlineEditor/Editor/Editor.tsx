import { useEffect, useRef, useState } from 'react';
import { editor as monacoEditor } from 'monaco-editor';

/** constants */
import { editorOptions } from '../../../constants';

/** hooks */
import { useGraphiQL } from '../../../hooks';

/** styles */
import { EditorStyled, MonacoWrap } from './styles';

/** theme */
import { editorTheme } from '../../../theme';

/** utils */
import { getOrCreateModel } from '../../../utils';

export const Editor = ({
  action,
  defaultValue,
  language,
  optionOverrides,
  hashedUri,
  value,
  valueSetter,
}: {
  action?: monacoEditor.IActionDescriptor;
  defaultValue: string;
  language: 'graphql' | 'json';
  optionOverrides?: monacoEditor.IStandaloneEditorConstructionOptions;
  hashedUri: string;
  value: string;
  valueSetter: ({ value }: { value: string }) => void;
}) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState<monacoEditor.IStandaloneCodeEditor | null>(null);
  const { schema, setEditors } = useGraphiQL();

  const model = getOrCreateModel({ uri: hashedUri, value: defaultValue });

  useEffect(() => {
    if (editor) {
      editor.setModel(model);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

  useEffect(() => {
    model.onDidChangeContent(() => {
      valueSetter({ value: model.getValue() });
    });

    if (!editor) {
      const newEditor = monacoEditor.create(
        editorRef.current as unknown as HTMLDivElement,
        {
          language,
          model,
          ...editorOptions, // spread our base options
          ...(optionOverrides && optionOverrides), // spread any option overrides that were passed in
        }
      );
      setEditor(newEditor);
      setEditors({
        editor: newEditor,
        name: hashedUri.substring(hashedUri.indexOf('-') + 1, hashedUri.lastIndexOf('.')),
      });

      if (action) {
        newEditor?.addAction(action);
      }

      monacoEditor.defineTheme('myTheme', editorTheme);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editor) {
      const selection = editor.getSelection();
      const m = editor.getModel();
      if (selection && m) {
        editor.executeEdits('update-value', [
          {
            range: m.getFullModelRange(),
            text: value,
            forceMoveMarkers: true,
          },
        ]);
        editor.setSelection(selection);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <EditorStyled>
      <MonacoWrap ref={editorRef} />
    </EditorStyled>
  );
};
