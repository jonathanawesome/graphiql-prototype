import { GraphQLSchema } from 'graphql';
import { editor as MONACO_EDITOR } from 'monaco-editor';

export type GraphiQLSchemaStore = {
  executeOperation: () => Promise<void>;
  runOperationAction: () => MONACO_EDITOR.IActionDescriptor;
  initSchema: ({ name, url }: { name?: string; url?: string }) => Promise<void>;
  schemaLoading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  schema: GraphQLSchema | null | { error: any };
  schemaName: string | null;
  schemaUrl: string | null;
};
