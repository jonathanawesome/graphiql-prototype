import { ArgumentNode, FieldNode, Kind, SelectionNode } from 'graphql';

/** hooks */
import { useOperation } from '@/hooks';

/** types */
import {
  AncestorField,
  SetNextSelectionSetSignature,
  SetNextVariableDefinitionsSignature,
} from '../types';

/** utils */
import { capitalize } from '@/utils';

export const handleRemoveField = ({
  ancestor,
  setNextSelectionSet,
  setNextVariableDefinitions,
  target,
}: {
  ancestor: AncestorField;
  setNextSelectionSet: SetNextSelectionSetSignature;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
  target: AncestorField;
}) => {
  const operationDefinition = useOperation.getState().operationDefinition;
  const variableDefinitions = operationDefinition?.variableDefinitions;

  // console.log('running handleRemoveField', {
  //   ancestor,
  // });

  /** begin handle removing variable definitions */
  // TODO: this is pretty gross (👇), but my brain hurts so i'm going to fix it later
  if (
    ancestor.selection &&
    ancestor.selection.kind === Kind.FIELD &&
    ancestor.selection.arguments &&
    ancestor.selection.arguments?.length > 0
  ) {
    const argNamesToRemove: string[] = ancestor.selection.arguments.flatMap(
      (a: ArgumentNode) => {
        if (a.value.kind === Kind.VARIABLE) {
          return a.value.name.value;
        } else if (a.value.kind === Kind.OBJECT) {
          return a.value.fields.map(
            (f) =>
              `${ancestor.field.name}${capitalize(a.name.value)}${capitalize(
                f.name.value
              )}`
          );
        } else {
          return [];
        }
      }
    );

    const remainingVarDefs = variableDefinitions?.filter(
      (v) => !argNamesToRemove.includes(v.variable.name.value)
    );

    if (argNamesToRemove && remainingVarDefs) {
      setNextVariableDefinitions({
        nextVariableDefinitions: remainingVarDefs,
      });
    }
  }
  /** end handle removing variable definitions */

  /** filter this field from the ancestor selection set */
  const filteredSelections: SelectionNode[] = (
    ancestor.selectionSet?.selections as FieldNode[]
  ).filter((s) => s.name.value !== target.field.name);

  /** update the nextSelectionSet...no reason to use siblings here because they're in the filtered array */
  return setNextSelectionSet({
    nextSelectionSet: {
      kind: Kind.SELECTION_SET,
      selections: filteredSelections,
    },
  });
};
