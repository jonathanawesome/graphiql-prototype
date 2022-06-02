import { FieldNode, Kind } from 'graphql';

/** helpers */
import { findFieldSiblings } from '../helpers';

/** types */
import {
  AncestorField,
  ArgumentAction,
  NextAction,
  NextSelectionSet,
  SetNextSelectionSetSignature,
} from '../types';

/** utils */
// import {
//   getRequiredArgumentNodesForField,
//   getRequiredVariableDefinitionsForField,
// } from '@/utils';

export const handleAddParentField = ({
  ancestor,
  nextAction,
  nextSelectionSet,
  setNextSelectionSet,
}: {
  ancestor: AncestorField;
  nextAction: NextAction;
  nextSelectionSet: NextSelectionSet;
  setNextSelectionSet: SetNextSelectionSetSignature;
}) => {
  // console.log(`running handleAddParentField`, {
  //   ancestor,
  // });

  /** this field needs to be made active, so we build a new FieldNode using the field name and all child selections  */
  const newFieldNode: FieldNode = {
    kind: Kind.FIELD,
    name: {
      kind: Kind.NAME,
      value: ancestor.field.name,
    },
    selectionSet: nextSelectionSet || undefined,
    arguments: nextAction ? [(nextAction.payload as ArgumentAction).node] : undefined,
    //TODO: Decision re: automatically adding required args
    // arguments: getRequiredArgumentNodesForField({
    //   field: ancestor.field,
    // }),
  };

  //TODO: if we automatically add required args, we need to add the variable definitions as well 👇
  // if we have required args for this field we need to get the variable definitions
  // const requiredVariableDefinitions = getRequiredVariableDefinitionsForField({
  //   field: ancestor.field,
  // });

  // if (requiredVariableDefinitions.length > 0) {
  //   const nextVarDefs = nextVariableDefinitions ? [...nextVariableDefinitions] : [];
  //   setNextVariableDefinitions({
  //     nextVariableDefinitions: [...nextVarDefs, ...requiredVariableDefinitions],
  //   });
  // }

  const siblings = findFieldSiblings({ ancestor });

  /** update the nextSelectionSet */
  return setNextSelectionSet({
    nextSelectionSet: {
      kind: Kind.SELECTION_SET,
      selections: siblings ? [newFieldNode, ...siblings] : [newFieldNode],
    },
  });
};
