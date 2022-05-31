import create from 'zustand';
import { Kind, OperationDefinitionNode } from 'graphql';

/** handlers */
import {
  handleAddField,
  handleAddFieldArgument,
  handleAddInputTypeArgument,
  handleAddParentField,
  handleAddParentInlineFragment,
  handleRemoveField,
  handleRemoveFieldArgument,
  handleRemoveInputTypeArgument,
  handleUpdateParentField,
  handleUpdateParentInlineFragment,
  handleUpdateParentInputType,
  handleRoot,
} from './handlers';

/** hooks */
import { useOperation } from '../useOperation';

/** types */
import { TogglerStore } from './types';

const onEditDefinition = useOperation.getState().onEditDefinition;
const operationDefinition = useOperation.getState().operationDefinition;
const varDefs = operationDefinition?.variableDefinitions;

export const useToggler = create<TogglerStore>((set, get) => ({
  nextSelectionSet: null,
  setNextSelectionSet: ({ nextSelectionSet }) => {
    console.log('setNextSelectionSet', nextSelectionSet);
    set({ nextSelectionSet });
  },
  nextVariableDefinitions: varDefs ? [...varDefs] : undefined,
  setNextVariableDefinitions: ({ nextVariableDefinitions }) => {
    console.log('setNextVariableDefinitions', nextVariableDefinitions);
    set({ nextVariableDefinitions });
  },
  nextArguments: null,
  setNextArguments: ({ nextArguments }) => {
    console.log('setNextArguments', nextArguments);
    set({ nextArguments });
  },
  toggle: ({ ancestors }) => {
    const target = ancestors.values().next().value;
    const setNextSelectionSet = get().setNextSelectionSet;
    const setNextVariableDefinitions = get().setNextVariableDefinitions;
    const setNextArguments = get().setNextArguments;

    ancestors.forEach((ancestor, key) => {
      console.log({ name: key, ancestor, ancestors });

      const isRoot = 'rootTypeName' in ancestor;
      const isField = 'field' in ancestor;
      const isInlineFragment = 'onType' in ancestor;
      const isFieldArgument =
        'placement' in ancestor && ancestor.placement === 'ON_FIELD';
      const isInputTypeArgument =
        'placement' in ancestor && ancestor.placement === 'ON_INPUT_TYPE';
      const isInputType = 'onInputType' in ancestor;

      if (isRoot) {
        handleRoot({ ancestor, nextSelectionSet: get().nextSelectionSet });
      } else {
        /** begin handle TARGET */
        if (ancestor === target) {
          console.log('on TARGET, clearing nextSelectionSet', {
            ancestor,
            target,
          });
          setNextSelectionSet({ nextSelectionSet: null });

          /** begin handle FIELD_ARGUMENT */
          if (isFieldArgument) {
            if (!ancestor.selection) {
              handleAddFieldArgument({
                ancestor,
                nextVariableDefinitions: get().nextVariableDefinitions,
                setNextArguments,
                setNextVariableDefinitions,
              });
            } else {
              handleRemoveFieldArgument({
                ancestor,
                setNextArguments,
                setNextVariableDefinitions,
              });
            }
          } /** end handle FIELD_ARGUMENT */

          /** begin handle INPUT_TYPE_ARGUMENT */
          if (isInputTypeArgument) {
            console.log('isInputTypeArgument');
            if (!ancestor.selection) {
              handleAddInputTypeArgument({
                ancestor,
                setNextArguments,
                setNextVariableDefinitions,
              });
            } else {
              handleRemoveInputTypeArgument({
                ancestor,
                setNextArguments,
                setNextVariableDefinitions,
              });
            }
          } /** end handle INPUT_TYPE_ARGUMENT */

          /** begin handle FIELD */
          if (isField) {
            if (!ancestor.selection) {
              handleAddField({
                ancestor,
                nextVariableDefinitions: get().nextVariableDefinitions,
                setNextSelectionSet,
                setNextVariableDefinitions,
              });
            } else {
              handleRemoveField({
                ancestor,
                setNextSelectionSet,
                setNextVariableDefinitions,
                target,
              });
            }
          } /** end handle FIELD */
          /** end handle TARGET */
        } else {
          /** begin handle PARENT */

          /** begin handle parent INPUT_TYPE */
          if (isInputType) {
            handleUpdateParentInputType({
              ancestor,
              nextArguments: get().nextArguments,
              setNextArguments,
            });
          } /** end handle parent INPUT_TYPE */

          /** begin handle parent FIELD */
          if (isField) {
            if (!ancestor.selection) {
              handleAddParentField({
                ancestor,
                nextArguments: get().nextArguments,
                nextSelectionSet: get().nextSelectionSet,
                setNextSelectionSet,
              });
            } else {
              handleUpdateParentField({
                ancestor,
                nextArguments: get().nextArguments,
                nextSelectionSet: get().nextSelectionSet,
                setNextArguments,
                setNextSelectionSet,
              });
            }
          } /** end handle parent FIELD */

          /** begin handle parent INLINE_FRAGMENT */
          if (isInlineFragment) {
            if (!ancestor.selection) {
              handleAddParentInlineFragment({
                ancestor,
                nextSelectionSet: get().nextSelectionSet,
                setNextSelectionSet,
              });
            } else {
              handleUpdateParentInlineFragment({
                ancestor,
                nextSelectionSet: get().nextSelectionSet,
                setNextSelectionSet,
              });
            }
          } /** end handle parent INLINE_FRAGMENT */
        } /** end handle PARENT */
      }
    });

    // console.log('setting nextDefinition', {
    //   nextSelectionSet: get().nextSelectionSet,
    //   nextVariableDefinitions: get().nextVariableDefinitions,
    // });

    const nextSelectionSet = get().nextSelectionSet;

    const nextDefinition: OperationDefinitionNode = {
      ...((operationDefinition
        ? operationDefinition
        : {
            kind: Kind.OPERATION_DEFINITION,
            // TODO: ROOT <OPERATION></OPERATION>
            operation: 'query',
            name: {
              kind: Kind.NAME,
              value: 'ExampleQuery',
            },
          }) as OperationDefinitionNode),
      variableDefinitions: get().nextVariableDefinitions,
      selectionSet: nextSelectionSet ?? {
        kind: Kind.SELECTION_SET,
        selections: [],
      },
    };

    onEditDefinition({
      nextDefinition:
        nextSelectionSet && nextSelectionSet.selections.length > 0
          ? nextDefinition
          : null,
    });
  },
}));
