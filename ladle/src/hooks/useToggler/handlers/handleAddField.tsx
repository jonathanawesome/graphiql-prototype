import { FieldNode, Kind } from 'graphql';

/** helpers */
import { findFieldSiblings } from '../helpers';

/** types */
import {
  AncestorField,
  NextVariableDefinitions,
  SetNextSelectionSetSignature,
  SetNextVariableDefinitionsSignature,
} from '../types';

/** utils */
import {
  getRequiredArgumentNodesForField,
  getRequiredVariableDefinitionsForField,
} from '@/utils';

export const handleAddField = ({
  ancestor,
  nextVariableDefinitions,
  setNextSelectionSet,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorField;
  nextVariableDefinitions: NextVariableDefinitions;
  setNextSelectionSet: SetNextSelectionSetSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  console.log('running handleAddField', { ancestor });

  const siblings = findFieldSiblings({ ancestor });

  /** first, we build a new FieldNode using the field's name */
  const newFieldNode: FieldNode = {
    kind: Kind.FIELD,
    name: {
      kind: Kind.NAME,
      value: ancestor.field.name,
    },
    arguments: getRequiredArgumentNodesForField({
      field: ancestor.field,
    }),
  };

  /** if we have required args for this field we need to get the variable definitions */
  const requiredVariableDefinitions = getRequiredVariableDefinitionsForField({
    field: ancestor.field,
  });

  /** set the variable defintions */
  if (requiredVariableDefinitions.length > 0) {
    const nextVarDefs = nextVariableDefinitions ? [...nextVariableDefinitions] : [];
    setNextVariableDefinitions({
      nextVariableDefinitions: [...nextVarDefs, ...requiredVariableDefinitions],
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
