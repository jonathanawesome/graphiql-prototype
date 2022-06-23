import { VariableDefinitionNode } from 'graphql';

// hooks
import { usePathfinder } from '../../usePathfinder';

//utils
import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';

// get from editor hook
const activeEditorTab = getActiveEditorTab();
const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;
const currentOperationType = activeEditorTab?.operationDefinition?.operation;

export const setCorrectNextVariableDefinitions = ({
  newVariableDefinition,
}: {
  newVariableDefinition: VariableDefinitionNode;
}) => {
  const setNextVariableDefinitions = usePathfinder.getState().setNextVariableDefinitions;
  const nextRootType = usePathfinder.getState().nextRootType;

  if (currentOperationType === nextRootType) {
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
