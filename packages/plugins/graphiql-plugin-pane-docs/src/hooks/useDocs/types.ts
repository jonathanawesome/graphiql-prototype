import { GraphQLField, GraphQLSchema, GraphQLType } from 'graphql';

type DocTypes = GraphQLType | GraphQLSchema | GraphQLField<any, any, any>;

export type DocPlacement = 'EXPLORER' | 'PATHFINDER';

export type DocPane = {
  description: string | null;
  name: string;
  type: DocTypes;
};

type DocInstance = {
  activeDocPane: DocPane | null;
  docPanes: Array<DocPane>;
  placement: DocPlacement;
};

type DocInstances = Map<DocPlacement, DocInstance>;

export type DocsStore = {
  docsInstances: DocInstances;
  getDocsInstance: ({
    placement,
  }: {
    placement: DocPlacement;
  }) => DocInstance | undefined;
  initDocsInstance: ({
    docPane,
    placement,
  }: {
    docPane?: DocPane;
    placement: DocPlacement;
  }) => void;
  resetDocInstance: ({ placement }: { placement: DocPlacement }) => void;
  navigateBack: ({ placement }: { placement: DocPlacement }) => void;
  navigateForward: ({
    docPane,
    placement,
  }: {
    docPane: DocPane;
    placement: DocPlacement;
  }) => void;
};
