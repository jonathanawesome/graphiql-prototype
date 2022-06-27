import { VariableDefinitionNode } from 'graphql';

// hooks
import { usePathfinder } from '../../usePathfinder';

//utils
import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';

export const setCorrectNextVariableDefinitions = ({
  newVariableDefinition,
}: {
  newVariableDefinition: VariableDefinitionNode;
}) => {
  // get from editor hook
  const activeEditorTab = getActiveEditorTab();
  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;
  const currentOperationType = activeEditorTab?.operationDefinition?.operation;

  // get from pathfinder hook
  const setNextVariableDefinitions = usePathfinder.getState().setNextVariableDefinitions;
  const nextOperationType = usePathfinder.getState().nextOperationType;

  if (currentOperationType === nextOperationType) {
    setNextVariableDefinitions({
      nextVariableDefinitions: [
        ...(variableDefinitions ? variableDefinitions : []),
        newVariableDefinition,
      ],
    });
  } else {
    setNextVariableDefinitions({
      nextVariableDefinitions: [newVariableDefinition],
    });
  }
};
