import create from 'zustand';
import { Kind, OperationDefinitionNode } from 'graphql';

/** handlers */
import {
  handleAddField,
  handleAddArgument,
  handleAddInputField,
  handleAddInputObject,
  handleAddParentField,
  handleAddParentInlineFragment,
  handleRemoveField,
  handleRemoveArgument,
  handleRemoveInputField,
  handleUpdateInputObject,
  handleUpdateParentField,
  handleUpdateParentInlineFragment,
  handleRoot,
} from './handlers';

/** hooks */
import { useOperation } from '../useOperation';

/** types */
import { TogglerStore } from './types';

const onEditDefinition = useOperation.getState().onEditDefinition;
const operationDefinition = useOperation.getState().operationDefinition;
const variableDefinitions = operationDefinition?.variableDefinitions;

export const useToggler = create<TogglerStore>((set, get) => ({
  nextSelectionSet: null,
  setNextSelectionSet: ({ nextSelectionSet }) => {
    // console.log('setNextSelectionSet', nextSelectionSet);
    set({ nextSelectionSet });
  },
  nextVariableDefinitions: variableDefinitions ? [...variableDefinitions] : undefined,
  setNextVariableDefinitions: ({ nextVariableDefinitions }) => {
    // console.log('setNextVariableDefinitions', nextVariableDefinitions);
    set({ nextVariableDefinitions });
  },
  nextAction: null,
  setNextAction: (action) => {
    // console.log('nextAction', { action });
    set({ nextAction: action });
  },
  toggle: ({ ancestors }) => {
    const target = ancestors.values().next().value;
    const setNextSelectionSet = get().setNextSelectionSet;
    const setNextVariableDefinitions = get().setNextVariableDefinitions;
    const setNextAction = get().setNextAction;

    ancestors.forEach((ancestor, key) => {
      // console.log('toggle forEach', { name: key, ancestor, ancestors });

      const isRoot = 'rootTypeName' in ancestor;
      const isField = 'field' in ancestor;
      const isInlineFragment = 'onType' in ancestor;
      const isArgument = 'argument' in ancestor;
      const isInputField = 'inputField' in ancestor;
      const isInputObject = 'inputObject' in ancestor;

      if (isRoot) {
        handleRoot({ ancestor, nextSelectionSet: get().nextSelectionSet });
      } else {
        /** begin handle TARGET */
        if (ancestor === target) {
          // console.log('on TARGET, clearing nextSelectionSet', {
          //   ancestor,
          //   target,
          // });
          setNextSelectionSet({ nextSelectionSet: null });

          /** begin handle ARGUMENT */
          if (isArgument) {
            // console.log('isArgument');
            if (!ancestor.selection) {
              handleAddArgument({
                ancestor,
                nextVariableDefinitions: get().nextVariableDefinitions,
                setNextAction,
                setNextVariableDefinitions,
              });
            } else {
              handleRemoveArgument({
                ancestor,
                setNextAction,
                setNextVariableDefinitions,
              });
            }
          } /** end handle ARGUMENT */

          /** begin handle INPUT_FIELD */
          if (isInputField) {
            // console.log('isInputField');
            if (!ancestor.selection) {
              handleAddInputField({
                ancestor,
                setNextAction,
                setNextVariableDefinitions,
              });
            } else {
              handleRemoveInputField({
                ancestor,
                setNextAction,
                setNextVariableDefinitions,
              });
            }
          } /** end handle INPUT_FIELD */

          /** begin handle FIELD */
          if (isField) {
            // console.log('isField');
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

          /** begin handle parent INPUT_OBJECT */
          if (isInputObject) {
            // console.log('isInputObject');
            if (!ancestor.selection) {
              handleAddInputObject({
                ancestor,
                nextAction: get().nextAction,
                setNextAction,
              });
            } else {
              handleUpdateInputObject({
                ancestor,
                nextAction: get().nextAction,
                setNextAction,
              });
            }
          } /** end handle parent INPUT_OBJECT */

          /** begin handle parent FIELD */
          if (isField) {
            // console.log('isField(parent)');

            if (!ancestor.selection) {
              handleAddParentField({
                ancestor,
                nextAction: get().nextAction,
                nextSelectionSet: get().nextSelectionSet,
                setNextSelectionSet,
              });
            } else {
              handleUpdateParentField({
                ancestor,
                nextAction: get().nextAction,
                nextSelectionSet: get().nextSelectionSet,
                setNextAction,
                setNextSelectionSet,
              });
            }
          } /** end handle parent FIELD */

          /** begin handle parent INLINE_FRAGMENT */
          if (isInlineFragment) {
            // console.log('isInlineFragment)');
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
