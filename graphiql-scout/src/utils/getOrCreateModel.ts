import { editor, Uri } from 'monaco-editor';

export const getOrCreateModel = ({ uri, value }: { uri: string; value: string }) => {
  const language = uri.split('.').pop();
  return (
    editor.getModel(Uri.file(uri)) ?? editor.createModel(value, language, Uri.file(uri))
  );
};
