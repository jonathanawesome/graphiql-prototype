import {
  FieldNode,
  GraphQLField,
  InlineFragmentNode,
  Kind,
  OperationDefinitionNode,
  SelectionNode,
  SelectionSetNode,
} from 'graphql';

/** hooks */
import { useOperation } from '@/hooks';

type AncestorSelection = SelectionNode | undefined;
type AncestorSelectionSet = SelectionSetNode | undefined;

export type AncestorRoot = {
  rootTypeName: string;
};

export type AncestorField = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
  selection: AncestorSelection;
  selectionSet: AncestorSelectionSet;
};

export type AncestorInlineFragment = {
  onType: string;
  selection: AncestorSelection;
  selectionSet: AncestorSelectionSet;
};

type AncestorTypes = AncestorRoot | AncestorField | AncestorInlineFragment;

/** we're using a Map here so that we can take advantage of the insertion order */
export type AncestorMap = Map<string, AncestorTypes>;

const findSiblings = ({
  ancestor,
}: {
  ancestor: AncestorTypes;
}): SelectionNode[] | undefined => {
  if ('field' in ancestor) {
    return ancestor.selectionSet?.selections.filter(
      (s) => (s as FieldNode).name.value !== ancestor.field?.name
    );
  } else if ('onType' in ancestor) {
    return ancestor.selectionSet?.selections.filter(
      (s) => (s as InlineFragmentNode).typeCondition?.name.value !== ancestor.onType
    );
  }
  return undefined;
};

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
  const target = ancestors.values().next().value;

  /**
   * this will move through our AncestorFields in their original insertion order
   * the target-field will be first
   * the target-field's parent-field (if there is one), would be next
   * then the target-field's parent-field's parent...and so on until we hit the root ancestor
   * */
  ancestors.forEach((ancestor, key) => {
    console.log({ name: key, ancestor, nextSelectionSet, ancestors });
    const isRoot = 'rootTypeName' in ancestor;
    const isField = 'field' in ancestor;
    const isInlineFragment = 'onType' in ancestor;

    /** find possible siblings */
    let siblings: SelectionNode[] | undefined = undefined;
    if (ancestor) {
      siblings = findSiblings({ ancestor });
    }

    if (isRoot) {
      /**
       * TODO: figure out how to use this to mark our operation type
       */
      return console.log(`on the root:`, {
        rootTypeName: ancestor.rootTypeName,
        nextSelectionSet,
      });
    } else {
      /** begin handle target */

      if (ancestor === target) {
        // console.log(`on the target:`, { ancestor });
        /**
         * when we're on the target, it's currently either active (ancestor.selection) or inactive (!ancestor.selection)
         * if it's active, we want to deactivate it (remove)
         * if it's inactive, we want to activate it (add)
         */

        /** begin handle FIELD */
        if (isField) {
          if (!ancestor.selection) {
            /** inactive, let's add it */
            // console.log('adding target field', { ancestor });

            /** first, we build a new FieldNode using the field's name */
            const newFieldNode: FieldNode = {
              kind: Kind.FIELD,
              name: {
                kind: Kind.NAME,
                value: ancestor.field.name,
              },
            };

            /** then we update the nextSelectionSet to include our new field node and any sibling selections */
            return (nextSelectionSet = {
              ...nextSelectionSet,
              selections: siblings ? [newFieldNode, ...siblings] : [newFieldNode],
            });
          } else {
            /** active, let's remove it */
            // console.log('removing target field', { ancestor });

            /** filter this field from the ancestor selection set */
            const filtered: SelectionNode[] = (
              ancestor.selectionSet?.selections as FieldNode[]
            ).filter((s) => s.name.value !== target.field.name);

            /** update the nextSelectionSet...no reason to use siblings here because they're in the filtered array */
            return (nextSelectionSet = {
              ...nextSelectionSet,
              selections: filtered,
            });
          }
        } /** end handle FIELD */

        //TODO handle arguments
        /** end handle target */
      } else {
        /** begin handle parent */
        // console.log(`NOT on the target`, { ancestor });

        /** begin handle parent FIELD */
        if (isField) {
          if (ancestor.selection && ancestor.selectionSet) {
            // console.log(`NOT on the target, it's a parent FIELD, it is selected`, { ancestor, siblings });
            ((ancestor.selection as FieldNode).selectionSet as SelectionSetNode) =
              nextSelectionSet;

            /** update the nextSelectionSet */
            return (nextSelectionSet = {
              kind: Kind.SELECTION_SET,
              selections: siblings
                ? [ancestor.selection as SelectionNode, ...siblings]
                : [ancestor.selection as SelectionNode],
            });
          } else {
            // console.log(`NOT on the target, it's a parent FIELD, it is NOT selected`, { ancestor });
            /** this field needs to be made active, so we build a new FieldNode using the field name and all child selections  */
            const newFieldNode: FieldNode = {
              kind: Kind.FIELD,
              name: {
                kind: Kind.NAME,
                value: ancestor.field.name,
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
        /** end handle parent FIELD */

        /** begin handle parent INLINE_FRAGMENT */
        if (isInlineFragment) {
          if (ancestor.selection && ancestor.selectionSet) {
            console.log(
              `NOT on the target, it's a parent INLINE_FRAGMENT, it is selected`,
              {
                ancestor,
                siblings,
                'ancestor.selection': ancestor.selection,
                nextSelectionSet,
                // nextSelectionSet: {
                //   kind: Kind.SELECTION_SET,
                //   selections: siblings
                //     ? [ancestor.selection as SelectionNode, ...siblings]
                //     : [ancestor.selection as SelectionNode],
                // },
              }
            );
            if (nextSelectionSet.selections.length === 0) {
              /** update the nextSelectionSet */
              return (nextSelectionSet = {
                kind: Kind.SELECTION_SET,
                selections: siblings ? [...siblings] : [],
              });
            } else {
              ((ancestor.selection as FieldNode).selectionSet as SelectionSetNode) =
                nextSelectionSet;
              /** update the nextSelectionSet */
              return (nextSelectionSet = {
                kind: Kind.SELECTION_SET,
                selections: siblings
                  ? [ancestor.selection, ...siblings]
                  : [ancestor.selection],
              });
            }
            // if siblings is 0
          } else {
            // console.log(`NOT on the target, it's a parent INLINE_FRAGMENT, it is NOT selected`, { ancestor, });
            const newInlineFragmentNode: InlineFragmentNode = {
              kind: Kind.INLINE_FRAGMENT,
              typeCondition: {
                kind: Kind.NAMED_TYPE,
                name: { kind: Kind.NAME, value: ancestor.onType },
              },
              selectionSet: nextSelectionSet,
            };
            /** update the nextSelectionSet */
            return (nextSelectionSet = {
              ...nextSelectionSet,
              selections: siblings
                ? [newInlineFragmentNode, ...siblings]
                : [newInlineFragmentNode],
            });
          }
        } /** end handle parent INLINE_FRAGMENT */
      } /** end handle parent */
    }
    return undefined;
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
