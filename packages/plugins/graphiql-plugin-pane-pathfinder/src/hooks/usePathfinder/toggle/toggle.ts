import { Kind } from 'graphql';

// handlers
import { handleAddField } from './handlers/handleAddField';
import { handleAddArgument } from './handlers/handleAddArgument';
import { handleRemoveArgument } from './handlers/handleRemoveArgument';
import { handleRemoveField } from './handlers/handleRemoveField';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import { AncestorField, AncestorsArray } from '../types';

// utils
import { getPreviousAncestor, getRootAncestor, insertNewOperation } from './utils';
import {} from './utils/getRootAncestor';
import {} from './utils/getPreviousAncestor';

export const toggle = ({
  ancestors,
}: {
  ancestors: AncestorsArray;
  // eslint-disable-next-line consistent-return
}) => {
  const activeDefinition = useEditor.getState().activeDefinition;

  if (!activeDefinition) {
    return insertNewOperation({ ancestors });
  }

  const rootAncestor = getRootAncestor({ ancestors });

  // if the toggled item is on an operationType that differs from the current operationType, insert a new operation
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

  const target = ancestors[ancestors.length - 1];

  const previousAncestor = getPreviousAncestor({ ancestors, target });

  console.log('toggle', {
    ancestors,
    activeDefinition,
    target,
  });

  const isField = target.type === 'FIELD';

  const isArgument = target.type === 'ARGUMENT';

  if (isArgument) {
    const isSelected = !!target.selection;

    if (isSelected) {
      handleRemoveArgument({
        target,
      });
    }

    if (!isSelected) {
      handleAddArgument({
        previousAncestor: previousAncestor as AncestorField,
        rootAncestor,
        target,
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
