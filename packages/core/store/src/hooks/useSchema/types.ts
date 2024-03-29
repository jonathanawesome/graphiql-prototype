import { GraphQLSchema } from 'graphql';
import { editor as MONACO_EDITOR } from 'monaco-editor';

export type GraphiQLSchemaStore = {
  isExecuting: boolean;
  executeOperation: () => Promise<void>;
  runOperationAction: () => MONACO_EDITOR.IActionDescriptor;
  loadSchema: ({ init, url }: { init?: boolean; url: string }) => Promise<void>;
  schemaLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: GraphQLSchema | null | { error: any };
  schemaUrl: string | null;
};
