import { GetState } from 'zustand';
import {
  Kind,
  NameNode,
  OperationDefinitionNode,
  OperationTypeNode,
  print,
} from 'graphql';

import { defaultOperation, useEditor } from '@graphiql-prototype/use-editor';

// handlers
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
} from './handlers';

// types
import { AncestorMap, PathfinderStore } from '../types';

const initEditorTab = useEditor.getState().initEditorTab;
const updateModel = useEditor.getState().updateModel;
const updateOperationDefinition = useEditor.getState().updateOperationDefinition;

export const toggle = ({
  ancestors,
  get,
  operationType,
}: {
  ancestors: AncestorMap;
  get: GetState<PathfinderStore>;
  operationType: OperationTypeNode;
}) => {
  const activeEditorTab = useEditor.getState().getActiveTab();
  const activeOperationDefinition = activeEditorTab?.operationDefinition;
  const currentOperationType = activeEditorTab?.operationDefinition?.operation;

  const target = ancestors.values().next().value;
  const setNextOperationType = get().setNextOperationType;
  const setNextSelectionSet = get().setNextSelectionSet;
  const setNextVariableDefinitions = get().setNextVariableDefinitions;
  const setNextAction = get().setNextAction;

  let incomingOperationType: OperationTypeNode;

  if (operationType === 'mutation') {
    incomingOperationType = OperationTypeNode.MUTATION;
  } else if (operationType === 'subscription') {
    incomingOperationType = OperationTypeNode.SUBSCRIPTION;
  } else {
    incomingOperationType = OperationTypeNode.QUERY;
  }
  // console.log('toggle', { incomingOperationType });

  setNextOperationType({ nextOperationType: incomingOperationType });

  // on each call to toggle, we run this function for each ancestor
  // the setNext*** functions (👆) allow us to pass data from one ancestor to the previous
  ancestors.forEach((ancestor) => {
    // console.log('toggle forEach', { name: key, ancestor, ancestors });

    const isField = 'field' in ancestor;
    const isInlineFragment = 'onType' in ancestor;
    const isArgument = 'argument' in ancestor;
    const isInputField = 'inputField' in ancestor;
    const isInputObject = 'inputObject' in ancestor;

    /** begin handle TARGET */
    if (ancestor === target) {
      // console.log('on TARGET', {
      //   ancestor,
      //   target,
      // });

      /** begin handle ARGUMENT */
      if (isArgument) {
        // console.log('isArgument');
        if (!ancestor.selection) {
          handleAddArgument({
            ancestor,
            setNextAction,
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
            nextOperationType: get().nextOperationType,
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
            setNextAction,
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
  });

  // console.log('setting nextDefinition', {
  //   nextSelectionSet: get().nextSelectionSet,
  //   nextVariableDefinitions: get().nextVariableDefinitions,
  // });

  const nextSelectionSet = get().nextSelectionSet;
  const nextOperationType = get().nextOperationType;

  // console.log('nextOperationType', {
  //   nextOperationType,
  //   currentOperationType,
  //   activeOperationDefinition,
  // });

  let nextDefinition: OperationDefinitionNode;

  const kind = Kind.OPERATION_DEFINITION;

  const operation =
    nextOperationType === 'query' ? OperationTypeNode.QUERY : OperationTypeNode.MUTATION;

  const name = (count: number): NameNode => ({
    kind: Kind.NAME,
    value: `Tab${count}`,
  });

  const variableDefinitions = get().nextVariableDefinitions;

  const selectionSet = nextSelectionSet ?? {
    kind: Kind.SELECTION_SET,
    selections: [],
  };

  // if the rootType is different than currentOperationType,
  // spin up a new tab and do work there
  if (currentOperationType && nextOperationType !== currentOperationType) {
    initEditorTab();
    nextDefinition = {
      kind,
      operation,
      name: name(useEditor.getState().editorTabs.length),
      variableDefinitions,
      selectionSet,
    };
  } else {
    nextDefinition = {
      ...(activeOperationDefinition
        ? activeOperationDefinition
        : // 👇 we don't have an active operation definition, so this is the initial tab
          {
            kind,
            operation,
            name: name(useEditor.getState().editorTabs.length),
          }),
      variableDefinitions,
      selectionSet,
    };
  }

  // we have selections, let's update our operation definition and model
  if (nextSelectionSet && nextSelectionSet.selections.length > 0) {
    updateOperationDefinition({ newDefinition: nextDefinition });
    updateModel({
      modelType: 'operationsModel',
      newValue: print({
        kind: Kind.DOCUMENT,
        definitions: [nextDefinition],
      }),
    });
  } else {
    // we don't have any selections, so we null our operation definition and "reset" our operation model
    updateOperationDefinition({ newDefinition: null });
    updateModel({
      modelType: 'operationsModel',
      newValue: defaultOperation,
    });
  }

  // clear state for next toggle
  setNextSelectionSet({ nextSelectionSet: null });
  setNextVariableDefinitions({ nextVariableDefinitions: [] });
};
