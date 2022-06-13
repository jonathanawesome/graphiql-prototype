import { FieldNode, Kind } from 'graphql';
import { getActiveEditorTab } from '@graphiql-v2-prototype/graphiql-editor';

/** helpers */
import { findFieldSiblings } from '../helpers';

/** types */
import {
  AncestorField,
  SetNextSelectionSetSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

export const handleAddField = ({
  ancestor,
  setNextSelectionSet,
  setNextVariableDefinitions,
}: {
  ancestor: AncestorField;
  setNextSelectionSet: SetNextSelectionSetSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
}) => {
  // console.log('running handleAddField', { ancestor });
  const activeEditorTab = getActiveEditorTab();
  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

  const siblings = findFieldSiblings({ ancestor });

  /** first, we build a new FieldNode using the field's name */
  const newFieldNode: FieldNode = {
    kind: Kind.FIELD,
    name: {
      kind: Kind.NAME,
      value: ancestor.field.name,
    },
    // arguments: getRequiredArgumentNodesForField({
    //   field: ancestor.field,
    // }),
  };

  /** if we have required args for this field we need to get the variable definitions */
  // const requiredVariableDefinitions = getRequiredVariableDefinitionsForField({
  //   field: ancestor.field,
  // });

  // /** set the variable defintions */
  // if (requiredVariableDefinitions.length > 0) {
  //   const nextVarDefs = nextVariableDefinitions ? [...nextVariableDefinitions] : [];
  //   setNextVariableDefinitions({
  //     nextVariableDefinitions: [...nextVarDefs, ...requiredVariableDefinitions],
  //   });
  // }

  setNextVariableDefinitions({
    nextVariableDefinitions: [...(variableDefinitions ? variableDefinitions : [])],
  });

  /** update the nextSelectionSet to include our new field node and any sibling selections */
  return setNextSelectionSet({
    nextSelectionSet: {
      kind: Kind.SELECTION_SET,
      selections: siblings ? [newFieldNode, ...siblings] : [newFieldNode],
    },
  });
};
