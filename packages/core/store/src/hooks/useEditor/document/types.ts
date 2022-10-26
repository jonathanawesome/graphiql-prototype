import type { DefinitionNode } from 'graphql';

export type DocumentState = {
  activeDefinition: DefinitionNode | null;
  editorDecorations: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    new: any[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    existing: any[];
  };
  hasActiveDefinition: boolean;
  documentDefinitions: number;
};

export type DocumentActions = {
  setActiveExecutableDefinition: ({
    definitionNode,
  }: {
    definitionNode: DefinitionNode | null;
  }) => void;
  setDocumentState: () => void;
  resetDocumentState: () => void;
};
