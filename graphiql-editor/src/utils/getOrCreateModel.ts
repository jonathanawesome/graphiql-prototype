import { editor as MONACO_EDITOR, Uri } from 'monaco-editor';

export const getOrCreateModel = ({ uri, value }: { uri: string; value: string }) => {
  const language = uri.split('.').pop();
  return (
    MONACO_EDITOR.getModel(Uri.file(uri)) ??
    MONACO_EDITOR.createModel(value, language, Uri.file(uri))
  );
};
