import { FieldNode, Kind } from 'graphql';

/** helpers */
import { findFieldSiblings } from '../helpers';

/** types */
import {
  AncestorField,
  NextArguments,
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
  nextArguments,
  nextSelectionSet,
  setNextSelectionSet,
}: {
  ancestor: AncestorField;
  nextArguments: NextArguments;
  nextSelectionSet: NextSelectionSet;
  setNextSelectionSet: SetNextSelectionSetSignature;
}) => {
  /** this field needs to be made active, so we build a new FieldNode using the field name and all child selections  */
  const newFieldNode: FieldNode = {
    kind: Kind.FIELD,
    name: {
      kind: Kind.NAME,
      value: ancestor.field.name,
    },
    selectionSet: nextSelectionSet || undefined,
    arguments: nextArguments ? nextArguments : undefined,
    //TODO: Decision re: automatically adding required args
    // here we need to decide if we want to get required or not....either way, we need to get the nextArguments and use them
    // arguments: getRequiredArgumentNodesForField({
    //   field: ancestor.field,
    // }),
  };

  console.log(`running handleAddParentField`, {
    ancestor,
    newFieldNode: {
      kind: Kind.FIELD,
      name: {
        kind: Kind.NAME,
        value: ancestor.field.name,
      },
      selectionSet: nextSelectionSet || undefined,
      arguments: nextArguments ? nextArguments : undefined,
    },
  });
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
