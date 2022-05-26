import {
  FieldNode,
  GraphQLField,
  Kind,
  OperationDefinitionNode,
  SelectionNode,
  SelectionSetNode,
} from 'graphql';

/** hooks */
import { useOperation } from '@/hooks';

export type AncestorField = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
  selection: SelectionNode | undefined;
  selectionSet: SelectionSetNode | undefined;
};

/** we're using a Map here so that we can take advantage of the insertion order */
export type AncestorMap = Map<string, AncestorField | null>;

export const toggleField = ({ ancestors }: { ancestors: AncestorMap }) => {
  const operationDefinition = useOperation.getState().operationDefinition;
  const onEditDefinition = useOperation.getState().onEditDefinition;

  /**
   * as we forEach through our ancestors this value is updated for processing by the next field (which will always be the parent field)
   * this value contains all selection changes from child fields
   * */
  let nextSelectionSet: SelectionSetNode = {
    kind: Kind.SELECTION_SET,
    selections: [],
  };

  /** we'll use this value more than once, so let's put it into a variable */
  const target = ancestors.values().next().value as AncestorField;

  /**
   * this will move through our AncestorFields in their original insertion order
   * the target-field will be first
   * the target-field's parent-field (if there is one), would be next
   * then the target-field's parent-field's parent...and so on until we hit the root ancestor
   * */
  ancestors.forEach((current, key) => {
    /** get the siblings for each field */
    const siblings = current?.selectionSet?.selections.filter(
      (s) => (s as FieldNode).name.value !== current.field.name
    );

    // console.log({ name: key, siblings, current, nextSelectionSet });

    if (!current) {
      /**
       * there isn't a value here, so we're on the root
       * TODO: figure out how to use this to mark our operation type
       */
      return console.log('were on the root:', { key, nextSelectionSet });
    } else {
      if (current === target) {
        // console.log('were on the target:', { current });
        /**
         * when we're on the target field, it's currently either active (current.selection) or inactive (!current.selection)
         * if it's active, we want to deactivate it (remove)
         * if it's inactive, we want to activate it (add)
         */

        if (!current.selection) {
          // console.log('adding target field', { name: current.field.name });
          /** inactive, so we want to add it */

          /** first, we build a new FieldNode using the field's name */
          const newFieldNode: FieldNode = {
            kind: Kind.FIELD,
            name: {
              kind: Kind.NAME,
              value: current.field?.name,
            },
          };

          /** then we update the nextSelectionSet to include our new field node and any sibling selections */
          return (nextSelectionSet = {
            ...nextSelectionSet,
            selections: siblings ? [newFieldNode, ...siblings] : [newFieldNode],
          });
        } else {
          // console.log('removing target field', { name: current.field.name });
          /** active, so we want to remove it */

          /** filter this field from the current selection set */
          const filtered: SelectionNode[] = (
            current?.selectionSet?.selections as FieldNode[]
          ).filter((s) => s.name.value !== target.field.name);

          /** update the nextSelectionSet...no reason to use siblings here because they're in the filtered array */
          return (nextSelectionSet = {
            ...nextSelectionSet,
            selections: filtered,
          });
        }
      } else {
        // console.log(`we're on a parent field`, { current });

        /** this check can probably be cleaned up, but what we're doing here is finding out whether this parent field is active or inactive */
        if (current && current.field && current.selection && current.selectionSet) {
          // console.log(`we're on a parent field and it is selected`, { current, siblings });

          /**
           * here we're overwriting the selection set for this parent field with our nextSelectionSet,
           * which has been updated by children fields of this parent field
           * this double assertion is gross...can this be cleaned up?
           */
          ((current.selection as FieldNode).selectionSet as SelectionSetNode) =
            nextSelectionSet;

          /** update the nextSelectionSet */
          return (nextSelectionSet = {
            kind: Kind.SELECTION_SET,
            selections: siblings
              ? [current.selection as SelectionNode, ...siblings]
              : [current.selection as SelectionNode],
          });
        } else {
          // console.log(`we're on a parent field and it is NOT selected`, { current, siblings });

          /** this field needs to be made active, so we build a new FieldNode using the field name and all child selections  */
          const newFieldNode: FieldNode = {
            kind: Kind.FIELD,
            name: {
              kind: Kind.NAME,
              value: current.field.name,
            },
            selectionSet: nextSelectionSet,
          };

          /** update the nextSelectionSet */
          return (nextSelectionSet = {
            ...nextSelectionSet,
            selections: siblings ? [newFieldNode, ...siblings] : [newFieldNode],
          });
        }
      }
    }
  });

  const nextDefinition: OperationDefinitionNode = {
    ...((operationDefinition
      ? operationDefinition
      : {
          kind: Kind.OPERATION_DEFINITION,
          // TODO: see above 👆
          operation: 'query',
          name: {
            kind: Kind.NAME,
            value: 'ExampleQuery',
          },
        }) as OperationDefinitionNode),
    // variableDefinitions: nextVarDefs ?? varDefs,
    selectionSet: nextSelectionSet,
  };

  onEditDefinition({
    nextDefinition: nextSelectionSet.selections.length > 0 ? nextDefinition : null,
  });
};
