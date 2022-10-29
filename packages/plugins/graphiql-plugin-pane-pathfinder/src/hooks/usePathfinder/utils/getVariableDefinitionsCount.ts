import { Kind } from 'graphql';

// store
import { useEditor } from '@graphiql-prototype/store';

export const getVariableDefinitionsCount = (): number => {
  const activeDefinition = useEditor.getState().activeDefinition;

  if (
    activeDefinition?.kind === Kind.OPERATION_DEFINITION &&
    activeDefinition.variableDefinitions
  ) {
    return activeDefinition.variableDefinitions.length;
  }
  return 0;
};
