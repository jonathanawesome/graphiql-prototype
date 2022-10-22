// handlers
import { handleAddField } from './handlers/handleAddField';
import { handleArgument } from './handlers/handleArgument';
import { handleRemoveField } from './handlers/handleRemoveField';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import {
  AncestorArgument,
  AncestorField,
  AncestorRoot,
  AncestorsArray,
  AncestorTypes,
} from '../types';

// utils
import { insertNewOperation } from './insertNewOperation';
import { Kind } from 'graphql';

export const toggle = ({
  ancestors,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line consistent-return
}) => {
  const target = ancestors[ancestors.length - 1];
  const index = ancestors.findIndex((a) => a === target);

  const previousAncestor = ancestors[index - 1] as Exclude<
    AncestorTypes,
    AncestorArgument
  >;
  const rootAncestor = ancestors[0] as AncestorRoot;

  const activeDefinition = useEditor.getState().activeDefinition;
  // // 👇 short-circuit this process and build a brand new operation if we don't have an active operation definition
  // if (rootAncestor.operationDefinition === null) {
  //   return insertNewOperation({ ancestors });
  // }
  if (!activeDefinition) {
    return insertNewOperation({ ancestors });
  }

  // if the toggled item is on an operationType that differs from the current operationType, insert a new operation
  console.log('toggle', {
    ancestors,
    activeDefinition,
    rootType: rootAncestor.operationType,
  });
  if (
    activeDefinition?.kind === Kind.OPERATION_DEFINITION &&
    activeDefinition.operation !== rootAncestor.operationType
  ) {
    const fullModelRange = useEditor
      .getState()
      .getActiveTab()
      ['operationsModel'].getFullModelRange();

    const range = {
      startLineNumber: fullModelRange.endLineNumber + 1,
      startColumn: 0 + 1,
      endLineNumber: fullModelRange.endLineNumber + 1,
      endColumn: 0 + 1,
    };
    console.log('insert new operations', {
      activeDefinition,
      range,
      fullRane: useEditor
        .getState()
        .getActiveTab()
        ['operationsModel'].getFullModelRange(),
    });
    // range here needs to be the end of the
    return insertNewOperation({
      ancestors,
      range,
    });
  }
  //   const initEditorTab = useEditor.getState().initEditorTab;

  //   initEditorTab({});

  //   return insertNewOperation({ ancestors });
  // }

  // // if the toggled item is on an operationType that differs from the current operationType, spin up a new tab and do work there
  // const currentOperationType =
  //   activeDefinition && 'operation' in activeDefinition && activeDefinition.operation;

  // if (rootAncestor.operationType !== currentOperationType) {
  //   const initEditorTab = useEditor.getState().initEditorTab;

  //   initEditorTab({});

  //   return insertNewOperation({ ancestors });
  // }

  const isNestedField =
    previousAncestor.type === 'FIELD' || previousAncestor.type === 'INLINE_FRAGMENT';
  const isField = target.type === 'FIELD';
  const isArgument = target.type === 'ARGUMENT';

  if (isArgument) {
    handleArgument({
      target,
      previousAncestor: previousAncestor as AncestorField,
      rootAncestor,
    });
  } // isArgument

  if (isField) {
    const isSelected = !!target.selection;

    if (isSelected) {
      handleRemoveField({
        ancestors,
        isNestedField,
        previousAncestor,
        target,
      });
    }

    if (!isSelected) {
      handleAddField({ ancestors, previousAncestor, rootAncestor, target });
    }
  } // isField
};
