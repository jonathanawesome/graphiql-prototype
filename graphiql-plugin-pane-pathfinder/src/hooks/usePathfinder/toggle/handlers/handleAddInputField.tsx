import { Kind, ObjectFieldNode } from 'graphql';
import { useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

/** types */
import {
  AncestorInputField,
  NextVariableDefinitions,
  SetNextActionSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

/** utils */
import { buildNewVariableDefinition } from '../../../../utils';

export const handleAddInputField = ({
  ancestor,
  setNextAction,
  nextVariableDefinitions,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorInputField;
  nextVariableDefinitions: NextVariableDefinitions;
  setNextAction: SetNextActionSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  const addVariable = useGraphiQL.getState().addVariable;

  console.log('running handleAddInputField', {
    type: ancestor.inputField.type,
    variableName: ancestor.variableName,
  });

  const newVarDef = buildNewVariableDefinition({
    type: ancestor.inputField.type,
    variableName: ancestor.variableName,
  });

  setNextVariableDefinitions({
    nextVariableDefinitions: [
      ...(nextVariableDefinitions ? nextVariableDefinitions : []),
      newVarDef,
    ],
  });

  addVariable({
    easyVar: {
      variableName: ancestor.variableName,
      variableType: ancestor.inputField.type,
      variableValue: '',
    },
  });

  const newObjectFieldNode: ObjectFieldNode = {
    kind: Kind.OBJECT_FIELD,
    name: {
      kind: Kind.NAME,
      value: ancestor.inputField.name,
    },
    value: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: ancestor.variableName,
      },
    },
  };

  setNextAction({
    type: 'ADD',
    payload: { type: 'INPUT_FIELD', node: newObjectFieldNode },
  });
};
