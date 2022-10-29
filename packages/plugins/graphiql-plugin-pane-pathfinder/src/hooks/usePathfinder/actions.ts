import { Kind } from 'graphql';

// handlers
import { addTargetField } from './handlers/addTargetField';
import { addTargetArgument } from './handlers/addTargetArgument';
import { removeTargetArgument } from './handlers/removeTargetArgument';
import { removeTargetField } from './handlers/removeTargetField';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import { AncestorField, AncestorsArray, SetPathfinderStore } from './types';

// utils
import { getPreviousAncestor, getRootAncestor, insertNewOperation } from './utils';

import { PathfinderActions } from './types';

export const pathfinderActions = (set: SetPathfinderStore): PathfinderActions => ({
  toggle: ({
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
        removeTargetArgument({
          target,
        });
      }

      if (!isSelected) {
        addTargetArgument({
          previousAncestor: previousAncestor as AncestorField,
          rootAncestor,
          target,
        });
      }
    } // isArgument

    if (isField) {
      const isSelected = !!target.selection;

      if (isSelected) {
        removeTargetField({
          ancestors,
          previousAncestor,
          target,
        });
      }

      if (!isSelected) {
        addTargetField({ ancestors, previousAncestor, rootAncestor, target });
      }
    } // isField
  },
  setArgumentHandlingMode: ({ mode }) => {
    set({ argumentHandlingMode: mode });
  },
});
