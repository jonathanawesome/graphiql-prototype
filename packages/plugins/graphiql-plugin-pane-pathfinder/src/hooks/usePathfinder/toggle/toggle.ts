import { Kind } from 'graphql';

// handlers
import { handleAddField } from './handlers/handleAddField';
import { handleAddArgument } from './handlers/handleAddArgument';
import { handleRemoveArgument } from './handlers/handleRemoveArgument';
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
import { createArgumentText, createVariableText } from '../utils';

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

  if (!activeDefinition) {
    return insertNewOperation({ ancestors });
  }

  // if the toggled item is on an operationType that differs from the current operationType, insert a new operation
  console.log('toggle', {
    ancestors,
    activeDefinition,
    // rootType: rootAncestor.operationType,
    target,
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

    return insertNewOperation({
      ancestors,
      range,
    });
  }

  const isField = target.type === 'FIELD';

  const isArgument = target.type === 'ARGUMENT';

  if (isArgument) {
    const isSelected = !!target.selection;

    const { name, type } = target.argument;

    const variableText = createVariableText({
      argumentName: name,
      argumentTypeAsString: type.toString(),
    });

    const argumentText = createArgumentText({
      argumentName: name,
    });

    if (isSelected) {
      handleRemoveArgument({
        argumentText,
        target,
        variableText,
      });
    }

    if (!isSelected) {
      handleAddArgument({
        argumentText,
        previousAncestor: previousAncestor as AncestorField,
        rootAncestor,
        variableText,
      });
    }
  } // isArgument

  if (isField) {
    const isSelected = !!target.selection;

    if (isSelected) {
      handleRemoveField({
        ancestors,
        previousAncestor,
        target,
      });
    }

    if (!isSelected) {
      handleAddField({ ancestors, previousAncestor, rootAncestor, target });
    }
  } // isField
};
