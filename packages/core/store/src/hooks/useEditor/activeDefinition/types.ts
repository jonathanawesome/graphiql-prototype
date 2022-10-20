import type { DefinitionNode } from 'graphql';

export type ActiveDefinitionState = {
  activeExecutableDefinition: DefinitionNode | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  newDecorations: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  existingDecorations: any[];
  hasActiveDefinition: boolean;
};

export type ActiveDefinitionActions = {
  setActiveExecutableDefinition: ({
    definitionNode,
  }: {
    definitionNode: DefinitionNode | null;
  }) => void;
  determineActiveExecutableDefinition: () => void;
};
