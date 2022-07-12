import { ArgumentNode, FieldNode, Kind, SelectionNode } from 'graphql';

// types
import {
  AncestorField,
  SetNextSelectionSetSignature,
  SetNextVariableDefinitionsSignature,
} from '../../types';

// utils
import { capitalize } from '../../../../utils';
import { getActiveEditorTab } from '@graphiql-prototype/graphiql-editor';

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
  const activeEditorTab = getActiveEditorTab();
  const variableDefinitions = activeEditorTab?.operationDefinition?.variableDefinitions;

  // console.log('running handleRemoveField', {
  //   ancestor,
  //   variableDefinitions,
  // });

  /** begin handle removing variable definitions */
  // TODO: this is pretty gross (👇), but my brain hurts so i'm going to fix it later
  if (
    ancestor.selection &&
    ancestor.selection.kind === Kind.FIELD &&
    ancestor.selection.arguments &&
    ancestor.selection.arguments?.length > 0
  ) {
    const variableNamesToRemove: string[] = ancestor.selection.arguments.flatMap(
      (a: ArgumentNode) => {
        if (a.value.kind === Kind.VARIABLE) {
          return a.value.name.value;
        } else if (a.value.kind === Kind.OBJECT) {
          return a.value.fields.map((f) => {
            console.log('f', f);
            //TODO nested input variables
            // if (f.value.kind === Kind.OBJECT) {}
            return `${ancestor.field.name}${capitalize(a.name.value)}${capitalize(
              f.name.value
            )}`;
          });
        } else {
          return [];
        }
      }
    );

    const remainingVarDefs = variableDefinitions?.filter(
      (v) => !variableNamesToRemove.includes(v.variable.name.value)
    );

    if (variableNamesToRemove && remainingVarDefs) {
      setNextVariableDefinitions({
        nextVariableDefinitions: remainingVarDefs,
      });
    }
  } else {
    setNextVariableDefinitions({
      nextVariableDefinitions: [...(variableDefinitions ? variableDefinitions : [])],
    });
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
