import { FieldNode, Kind } from 'graphql';

// helpers
import { getFieldSiblings } from '../helpers';

// types
import {
  AncestorField,
  NextOperationType,
  SetNextSelectionSetSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

// utils
import { useEditor } from '@graphiql-prototype/store';

export const handleAddField = ({
  ancestor,
  nextOperationType,
  setNextSelectionSet,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorField;
  nextOperationType: NextOperationType;
  setNextSelectionSet: SetNextSelectionSetSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  const activeEditorTab = useEditor.getState().getActiveTab();
  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;
  const currentOperationType = activeEditorTab?.operationDefinition?.operation;

  const siblings = getFieldSiblings({ ancestor });
  // console.log('running handleAddField', { ancestor, siblings });

  /** first, we build a new FieldNode using the field's name */
  const newFieldNode: FieldNode = {
    kind: Kind.FIELD,
    name: {
      kind: Kind.NAME,
      value: ancestor.field.name,
    },
  };

  /** if we have required args for this field we need to get the variable definitions */
  // const requiredVariableDefinitions = getRequiredVariableDefinitionsForField({
  //   field: ancestor.field,
  // });

  // /** set the variable definitions */
  // if (requiredVariableDefinitions.length > 0) {
  //   const nextVarDefs = nextVariableDefinitions ? [...nextVariableDefinitions] : [];
  //   setNextVariableDefinitions({
  //     nextVariableDefinitions: [...nextVarDefs, ...requiredVariableDefinitions],
  //   });
  // }

  // TODO: if we're toggling a different operation type, we should NOT pass existing variable definitions
  if (currentOperationType === nextOperationType) {
    setNextVariableDefinitions({
      nextVariableDefinitions: [...(variableDefinitions ? variableDefinitions : [])],
    });
  }

  /** update the nextSelectionSet to include our new field node and any sibling selections */
  return setNextSelectionSet({
    nextSelectionSet: {
      kind: Kind.SELECTION_SET,
      selections: siblings ? [newFieldNode, ...siblings] : [newFieldNode],
    },
  });
};
