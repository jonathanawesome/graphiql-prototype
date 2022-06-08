import { Kind, OperationDefinitionNode, print } from 'graphql';
import { GetState } from 'zustand';
import {
  getActiveEditorTab,
  useGraphiQLEditor,
} from '@graphiql-v2-prototype/graphiql-editor';

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

/** types */
import { AncestorMap, PathfinderStore } from '../types';

export const toggle = ({
  ancestors,
  get,
}: {
  ancestors: AncestorMap;
  get: GetState<PathfinderStore>;
}) => {
  const updateEditorTabData = useGraphiQLEditor.getState().updateEditorTabData;
  const activeEditorTab = getActiveEditorTab();
  const operationDefinition = activeEditorTab?.operationDefinition;

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

        //TODO 👆👇 these may be able to get combined into one

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
          // TODO: ROOT
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
  // onEditDefinition({
  //   nextDefinition:
  //     nextSelectionSet && nextSelectionSet.selections.length > 0 ? nextDefinition : null,
  // });
  if (nextSelectionSet && nextSelectionSet.selections.length > 0) {
    updateEditorTabData({
      dataType: 'operation',
      newValue: print({
        kind: Kind.DOCUMENT,
        definitions: [nextDefinition],
      }),
    });
  } else {
    updateEditorTabData({
      dataType: 'operation',
      newValue: '',
    });
  }

  // clear state for next toggle
  // setNextAction(null);
  setNextSelectionSet({ nextSelectionSet: null });
  setNextVariableDefinitions({ nextVariableDefinitions: [] });
};
