import { editor as MONACO_EDITOR } from 'monaco-editor';

export const pushEditOperationsToModel = ({
  model,
  text,
}: {
  model: MONACO_EDITOR.ITextModel;
  text: string;
}) => {
  model.pushEditOperations(
    [],
    [
      {
        range: model.getFullModelRange(),
        text,
      },
    ],
    () => []
  );
};
