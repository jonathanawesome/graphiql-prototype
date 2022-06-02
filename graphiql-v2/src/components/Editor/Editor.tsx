import { useEffect, useRef, useState } from 'react';
import { Uri, editor as monacoEditor } from 'monaco-editor';

/** constants */
import { AvailableEditors, editorOptions, EDITOR_URIS } from '../../constants';

/** hooks */
import { useGraphiQL } from '../../hooks';

/** styles */
import { EditorStyled, MonacoWrap } from './styles';

/** theme */
import { editorTheme } from '../../theme';

/** utils */
import { getOrCreateModel } from '../../utils';

export const Editor = ({
  action,
  defaultValue,
  language,
  optionOverrides,
  uri,
  value,
  valueSetter,
}: {
  action?: monacoEditor.IActionDescriptor;
  defaultValue: string;
  language: 'graphql' | 'json';
  optionOverrides?: monacoEditor.IStandaloneEditorConstructionOptions;
  uri: AvailableEditors;
  value: string;
  valueSetter: ({ value }: { value: string }) => void;
}) => {
  const editorRef = useRef(null);
  const [editor, setEditor] = useState<monacoEditor.IStandaloneCodeEditor | null>(null);
  const { editors, setEditors } = useGraphiQL();

  useEffect(() => {
    const editorFromStore = editors.find((e) => e.uri === uri);

    if (!editor && editorFromStore) {
      // set the editor locally
      setEditor(editorFromStore.editor);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editors]);

  useEffect(() => {
    const model = getOrCreateModel({ uri, value: defaultValue });

    model.onDidChangeContent(() => {
      // console.log({ modelValue: model.getValue() });
      valueSetter({ value: model.getValue() });
    });

    if (!editor) {
      const freshEditor = monacoEditor.create(
        editorRef.current as unknown as HTMLDivElement,
        {
          language,
          model,
          ...editorOptions, // spread our base options
          ...(optionOverrides && optionOverrides), // spread any option overrides that were passed in
        }
      );
      setEditors({ editor: freshEditor, uri });

      if (action) {
        freshEditor?.addAction(action);
      }

      monacoEditor.defineTheme('myTheme', editorTheme);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const model = monacoEditor.getModel(Uri.file(EDITOR_URIS[uri]));
    if (model) {
      // https://github.com/Microsoft/monaco-editor/issues/1397
      if (value !== model.getValue()) {
        // console.log(`setting value for ${uri}`, value);
        //update the operations editor when our value (either operation or variables) changes
        //TODO 👇 setValue is the quick way to update the model. pushEditOperations is recommended, but causes text selection on update.
        model.setValue(value);
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
