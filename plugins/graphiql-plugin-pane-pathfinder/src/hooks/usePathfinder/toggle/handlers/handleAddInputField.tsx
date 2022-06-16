import { Kind, ObjectFieldNode } from 'graphql';
import {
  getActiveEditorTab,
  getDisplayStringFromVariableDefinitionTypeNode,
  useGraphiQLEditor,
} from '@graphiql-v2-prototype/graphiql-editor';

/** types */
import {
  AncestorInputField,
  SetNextActionSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

/** utils */
import { buildNewVariableDefinition } from '../../../../utils';

const updateVariable = useGraphiQLEditor.getState().updateVariable;

export const handleAddInputField = ({
  ancestor,
  setNextAction,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorInputField;
  setNextAction: SetNextActionSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  const activeEditorTab = getActiveEditorTab();
  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

  // console.log('running handleAddInputField', {
  //   type: ancestor.inputField.type,
  //   variableName: ancestor.variableName,
  // });

  const newVarDef = buildNewVariableDefinition({
    type: ancestor.inputField.type,
    variableName: ancestor.variableName,
  });

  setNextVariableDefinitions({
    nextVariableDefinitions: [
      ...(variableDefinitions ? variableDefinitions : []),
      newVarDef,
    ],
  });

  // updateVariable({
  //   variableName: ancestor.variableName,
  //   variableValue: getDisplayStringFromVariableDefinitionTypeNode({
  //     type: newVarDef.type,
  //   }),
  // });

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
