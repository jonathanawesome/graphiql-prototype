import { MonacoEditor } from '@graphiql-prototype/editor';

export const Operations = () => {
  return <MonacoEditor monacoEditorType="operations" />;
};

export const Variables = () => {
  return <MonacoEditor monacoEditorType="variables" />;
};

export const Results = () => {
  return <MonacoEditor monacoEditorType="results" />;
};
