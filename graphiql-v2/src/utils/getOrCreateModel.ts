import { editor, Uri } from 'monaco-editor';

/** constants */
import { AvailableEditors, EDITOR_URIS } from '../constants';

export const getOrCreateModel = ({
  uri,
  value,
}: {
  uri: AvailableEditors;
  value: string;
}) => {
  return (
    editor.getModel(Uri.file(EDITOR_URIS[uri])) ??
    editor.createModel(
      value,
      EDITOR_URIS[uri].split('.').pop(),
      Uri.file(EDITOR_URIS[uri])
    )
  );
};
