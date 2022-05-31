import {
  ArgumentNode,
  FieldNode,
  GraphQLArgument,
  GraphQLField,
  InlineFragmentNode,
  Kind,
  ObjectFieldNode,
  ObjectValueNode,
  OperationDefinitionNode,
  SelectionNode,
  SelectionSetNode,
  VariableDefinitionNode,
  VariableNode,
} from 'graphql';

/** hooks */
import { useOperation, useVariables } from '@/hooks';
import {
  buildNewVariableDefinition,
  buildVariableNameValue,
  getRequiredArgumentNodesForField,
  getRequiredVariableDefinitionsForField,
} from '../../../utils';

type AncestorSelection = SelectionNode | undefined;
type AncestorSelectionSet = SelectionSetNode | undefined;

 type AncestorRoot = {
  rootTypeName: string;
};

 type AncestorArgument = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arg: GraphQLArgument;
  // arguments: ArgumentNode[] | undefined;
  selection: ArgumentNode | undefined;
  // selectionSet: AncestorSelectionSet;
  parentSelection: FieldNode | ArgumentNode | null;
  variableName: string;
};

 type AncestorField = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
  selection: AncestorSelection;
  selectionSet: AncestorSelectionSet;
};

 type AncestorInputType = {
  onInputType: string;
  selection: ArgumentNode | undefined;
  parentSelection: FieldNode | null;
};

 type AncestorInlineFragment = {
  onType: string;
  selection: AncestorSelection;
  selectionSet: AncestorSelectionSet;
};

type AncestorTypes =
  | AncestorRoot
  | AncestorField
  | AncestorInlineFragment
  | AncestorArgument
  | AncestorInputType;

/** we're using a Map here so that we can take advantage of the insertion order */
 type AncestorMap = Map<string, AncestorTypes>;







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










 const toggleField = ({ ancestors }: { ancestors: AncestorMap }) => {
  const operationDefinition = useOperation.getState().operationDefinition;
  const onEditDefinition = useOperation.getState().onEditDefinition;

  const varDefs = operationDefinition?.variableDefinitions;

  /** as we forEach through our ancestors these values are updated for processing by the next field (which will always be the parent field) */
  /** this value contains all selection changes from child fields */
  let nextSelectionSet: SelectionSetNode | null = null;
  /** this value contains all variable definition changes from child fields */
  let nextVariablesDefinitions: VariableDefinitionNode[] | undefined = varDefs
    ? [...varDefs]
    : [];

  /** this value contains argument nodes for the _next_ ancestor...should be cleared after use buy the _next_ ancestor */
  let nextArguments: ArgumentNode[] | ObjectFieldNode[] | null = null;

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
    const isArgument = 'arg' in ancestor;
    const isInputType = 'onInputType' in ancestor;

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
         * target is either a field or an argument
         * when we're on the target, it's currently either active (ancestor.selection) or inactive (!ancestor.selection)
         * if it's active, we want to deactivate it (remove)
         * if it's inactive, we want to activate it (add)
         */

        /** begin handle ARGUMENT */
        if (isArgument) {
          if (!ancestor.selection) {
            /** 
             * inactive, let's add it 
             * is this argument nested in an InputObjectType? 
             * identify sibling arguments
             * construct new 
             */
            console.log('adding target argument', { ancestor });

            // holder for sibling arguments
            let argumentSiblings: ArgumentNode[] | ObjectFieldNode[] | undefined =
              undefined;

            if (ancestor.parentSelection?.kind === Kind.ARGUMENT) {
              // this argument's parent is an inputObjectType
              // argumentSiblings = (
              //   ancestor.parentSelection.value as ObjectValueNode
              // ).fields.filter((f) => f.name.value !== ancestor.arg.name);

              // const newObjectFieldNode: ObjectFieldNode = {
              //   kind: Kind.OBJECT_FIELD,
              //   name: {
              //     kind: Kind.NAME,
              //     value: ancestor.arg.name,
              //   },
              //   value: {
              //     kind: Kind.VARIABLE,
              //     name: {
              //       kind: Kind.NAME,
              //       // value: 'breedsInputSpecies',
              //       value: buildVariableNameValue({
              //         fieldName: ancestor.parentSelection?.name.value as string,
              //         parentArgName: ancestor.parentSelection.name.value,
              //         argName: ancestor.arg.name,
              //       }),
              //     },
              //   },
              // };

              // const newArguments: ObjectFieldNode[] = argumentSiblings
              //   ? [newObjectFieldNode, ...argumentSiblings]
              //   : [newObjectFieldNode];

              // console.log('adding target argument, IS nested in an inputObject', {
              //   ancestor,
              //   argumentSiblings,
              //   newArguments,
              // });

              // nextArguments = newArguments;
            } else if (ancestor.parentSelection?.kind === Kind.FIELD) {
              // // this argument's parent is a field

              // argumentSiblings = ancestor.parentSelection?.arguments?.filter(
              //   (a) => a.name.value !== ancestor.arg.name
              // );

              // console.log('adding target argument, is NOT nested, is scalar arg', {
              //   ancestor,
              //   argumentSiblings,
              // });

              // const newArgumentNode: ArgumentNode = {
              //   kind: Kind.ARGUMENT,
              //   name: {
              //     kind: Kind.NAME,
              //     value: ancestor.arg.name,
              //   },
              //   value: {
              //     kind: Kind.VARIABLE,
              //     name: {
              //       kind: Kind.NAME,
              //       value: buildVariableNameValue({
              //         fieldName: ancestor.parentSelection?.name.value as string,
              //         parentArgName: null,
              //         argName: ancestor.arg.name,
              //       }),
              //     },
              //   },
              // };
              // const newArguments: ArgumentNode[] = argumentSiblings
              //   ? [newArgumentNode, ...argumentSiblings]
              //   : [newArgumentNode];

              // nextArguments = newArguments;
            }

            // for all adds, we need to build a companion variable deifnition
            const newVarDef = buildNewVariableDefinition({
              fieldName: ancestor.parentSelection?.name.value as string,
              parentArgName: null,
              forArg: ancestor.arg,
            });

            // return by setting the new variable definition into our temporary holder
            return (nextVariablesDefinitions = [
              ...(nextVariablesDefinitions ? nextVariablesDefinitions : []),
              newVarDef,
            ]);
          } else {

          // // holder for sibling arguments
          // let argumentSiblings: ArgumentNode[] | ObjectFieldNode[] | undefined =
          // undefined;
          //   /** active, let's remove it */
          //   if (ancestor.parentSelection?.kind === Kind.ARGUMENT) {
          //     // this argument's parent is an inputObjectType
          //     argumentSiblings = (
          //       ancestor.parentSelection.value as ObjectValueNode
          //     ).fields.filter((f) => f.name.value !== ancestor.arg.name);

          //   } else if (ancestor.parentSelection?.kind === Kind.FIELD) {
          //     /** filter this argument from the ancestor selection set */
          //     argumentSiblings = ancestor.parentSelection?.arguments?.filter(
          //       (a) => a.name.value !== ancestor.arg.name
          //     );
  
          //   }
          //     nextArguments = argumentSiblings || null;
  
          //     let newVarDefs: VariableDefinitionNode[] | undefined = undefined;
  
          //     if (varDefs) {
          //       newVarDefs = varDefs?.filter(
          //         (v) => v.variable.name.value !== ancestor.variableName
          //       );
          //     }
  
          //     console.log('removing target argument', {
          //       ancestor,
          //       siblings,
          //       argumentSiblings,
          //       nextSelectionSet,
          //       varDefs,
          //     });
  
          //     return (nextVariablesDefinitions = newVarDefs);


          }
        } /** end handle ARGUMENT */

        /** begin handle FIELD */
        if (isField) {
          if (!ancestor.selection) {
            // /** inactive, let's add it */
            // // console.log('adding target field', { ancestor });

            // /** first, we build a new FieldNode using the field's name */
            // const newFieldNode: FieldNode = {
            //   kind: Kind.FIELD,
            //   name: {
            //     kind: Kind.NAME,
            //     value: ancestor.field.name,
            //   },
            //   arguments: getRequiredArgumentNodesForField({
            //     field: ancestor.field,
            //   }),
            // };

            // // if we have required args for this field we need to get the variable definitions
            // const requiredVariableDefinitions = getRequiredVariableDefinitionsForField({
            //   field: ancestor.field,
            // });

            // console.log('adding target field', {
            //   ancestor,
            //   newFieldNode,
            //   requiredVariableDefinitions,
            //   nextVariablesDefinitions,
            // });

            // if (requiredVariableDefinitions.length > 0) {
            //   const nextVarDefs = nextVariablesDefinitions
            //     ? [...nextVariablesDefinitions]
            //     : [];
            //   nextVariablesDefinitions = [...nextVarDefs, ...requiredVariableDefinitions];
            // }

            // /** then we update the nextSelectionSet to include our new field node and any sibling selections */
            // return (nextSelectionSet = {
            //   kind: Kind.SELECTION_SET,
            //   selections: siblings ? [newFieldNode, ...siblings] : [newFieldNode],
            // });
          } else {
            // /** active, let's remove it */
            // // console.log('removing target field', { ancestor });

            // /** filter this field from the ancestor selection set */
            // const filtered: SelectionNode[] = (
            //   ancestor.selectionSet?.selections as FieldNode[]
            // ).filter((s) => s.name.value !== target.field.name);

            // /** update the nextSelectionSet...no reason to use siblings here because they're in the filtered array */
            // return (nextSelectionSet = {
            //   // ...nextSelectionSet,
            //   kind: Kind.SELECTION_SET,
            //   selections: filtered,
            // });
          }
        } /** end handle FIELD */

        /** end handle target */
      } else {
        /** begin handle parent */
        // console.log(`NOT on the target`, { ancestor });

        /** begin handle parent INPUT_TYPE */
        if (isInputType) {
          if (!ancestor.selection) {
          //   console.log(
          //     `NOT on the target, it's a parent INPUT_TYPE, it is NOT selected`,
          //     { ancestor, siblings, nextSelectionSet, nextArguments }
          //   );

          // /** this INPUT_TYPE needs to be made active, so we build a new FieldNode using the field name and all child selections  */
          // const newArgumentNode: ArgumentNode = {
          //   kind: Kind.ARGUMENT,
          //   name: {
          //     kind: Kind.NAME,
          //     value: 'THISISWRONG',
          //   },
          //   value: {
          //     kind: Kind.OBJECT,
          //     fields: nextArguments as ObjectFieldNode[],
          //   },
          // };

          // // // if we have required args for this field we need to get the variable definitions
          // // const requiredVariableDefinitions = getRequiredVariableDefinitionsForField({
          // //   field: ancestor.field,
          // // });

          // // if (requiredVariableDefinitions.length > 0) {
          // //   const nextVarDefs = nextVariablesDefinitions
          // //     ? [...nextVariablesDefinitions]
          // //     : [];
          // //   nextVariablesDefinitions = [...nextVarDefs, ...requiredVariableDefinitions];
          // // }

          // // /** update the nextSelectionSet */
          // // return (nextSelectionSet = {
          // //   kind: Kind.SELECTION_SET,
          // //   // ...nextSelectionSet,
          // //   selections: siblings ? [newFieldNode, ...siblings] : [newFieldNode],
          // // });
        } else {
          // console.log(`NOT on the target, it's a parent INPUT_TYPE, it is selected`, {
          //   ancestor,
          //   siblings,
          //   nextSelectionSet,
          //   nextArguments,
          // });
          // //grab the nextArguments
          // // spread them into self
          // // delete the nextArguments
        } /** end handle parent INPUT_TYPE */

        /** begin handle parent FIELD */
        if (isField) {
          if (!ancestor.selection) {
            // console.log(`NOT on the target, it's a parent FIELD, it is NOT selected`, {
            //   ancestor,
            // });
            // /** this field needs to be made active, so we build a new FieldNode using the field name and all child selections  */
            // const newFieldNode: FieldNode = {
            //   kind: Kind.FIELD,
            //   name: {
            //     kind: Kind.NAME,
            //     value: ancestor.field.name,
            //   },
            //   selectionSet: nextSelectionSet || undefined,
            //   arguments: getRequiredArgumentNodesForField({
            //     field: ancestor.field,
            //   }),
            // };

            // // if we have required args for this field we need to get the variable definitions
            // const requiredVariableDefinitions = getRequiredVariableDefinitionsForField({
            //   field: ancestor.field,
            // });

            // if (requiredVariableDefinitions.length > 0) {
            //   const nextVarDefs = nextVariablesDefinitions
            //     ? [...nextVariablesDefinitions]
            //     : [];
            //   nextVariablesDefinitions = [...nextVarDefs, ...requiredVariableDefinitions];
            // }

            // /** update the nextSelectionSet */
            // return (nextSelectionSet = {
            //   kind: Kind.SELECTION_SET,
            //   // ...nextSelectionSet,
            //   selections: siblings ? [newFieldNode, ...siblings] : [newFieldNode],
            // });
          } else {
            // if (nextSelectionSet) {
            //   ((ancestor.selection as FieldNode).selectionSet as SelectionSetNode) =
            //     nextSelectionSet;
            // }

            // if (nextArguments) {
            //   ((ancestor.selection as FieldNode).arguments as ArgumentNode[]) =
            //     nextArguments;
            //   nextArguments = null;
            // }
            // console.log(`NOT on the target, it's a parent FIELD, it is selected`, {
            //   ancestor,
            //   siblings,
            // });

            // /** update the nextSelectionSet */
            // return (nextSelectionSet = {
            //   kind: Kind.SELECTION_SET,
            //   selections: siblings
            //     ? [ancestor.selection as SelectionNode, ...siblings]
            //     : [ancestor.selection as SelectionNode],
            // });
          }
        }
        /** end handle parent FIELD */

        /** begin handle parent INLINE_FRAGMENT */
        if (isInlineFragment) {
          if (ancestor.selection && ancestor.selectionSet) {
            // console.log(
            //   `NOT on the target, it's a parent INLINE_FRAGMENT, it is selected`,
            //   { ancestor, siblings, nextSelectionSet }
            // );
            // if (nextSelectionSet.selections.length === 0) {
            //   /** this inline fragment has no more selections, so we only need to add siblings to the nextSlectionSet */
            //   return (nextSelectionSet = {
            //     kind: Kind.SELECTION_SET,
            //     selections: siblings ? [...siblings] : [],
            //   });
            // } else {
            //   /** this inline fragment has other selections, so we replace ancestor.selection.selectionSet with  nextSelectionSet _and_ add siblings*/
            //   (ancestor.selection as FieldNode).selectionSet = nextSelectionSet;
            //   return (nextSelectionSet = {
            //     kind: Kind.SELECTION_SET,
            //     selections: siblings
            //       ? [ancestor.selection, ...siblings]
            //       : [ancestor.selection],
            //   });
            // }
            // if siblings is 0
          } else {
            // console.log(
            //   `NOT on the target, it's a parent INLINE_FRAGMENT, it is NOT selected`,
            //   { ancestor }
            // );
            // const newInlineFragmentNode: InlineFragmentNode = {
            //   kind: Kind.INLINE_FRAGMENT,
            //   typeCondition: {
            //     kind: Kind.NAMED_TYPE,
            //     name: { kind: Kind.NAME, value: ancestor.onType },
            //   },
            //   selectionSet: nextSelectionSet,
            // };
            // /** update the nextSelectionSet */
            // return (nextSelectionSet = {
            //   ...nextSelectionSet,
            //   selections: siblings
            //     ? [newInlineFragmentNode, ...siblings]
            //     : [newInlineFragmentNode],
            // });
          }
        } /** end handle parent INLINE_FRAGMENT */
      } /** end handle parent */
    }
    return undefined;
  });
  console.log('setting nextDefinition', { nextSelectionSet, nextVariablesDefinitions });

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
    variableDefinitions: nextVariablesDefinitions,
    selectionSet: nextSelectionSet,
  };

  onEditDefinition({
    nextDefinition: nextSelectionSet.selections.length > 0 ? nextDefinition : null,
  });
};
