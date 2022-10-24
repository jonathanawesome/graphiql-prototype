import { print, Kind } from 'graphql';
import type { ArgumentNode, Location, VariableDefinitionNode } from 'graphql';

// constants
import { TARGET_EDITOR } from '../../constants';

// hooks
import { useEditor } from '@graphiql-prototype/store';

import { AncestorArgument, AncestorField, AncestorRoot } from '../../types';

export const handleRemoveArgument = ({
  previousAncestor,
  rootAncestor,
  target,
}: {
  previousAncestor: AncestorField;
  rootAncestor: AncestorRoot;
  target: AncestorArgument;
}) => {
  console.log('handleRemoveArgument', { previousAncestor });

  const hasSiblingArguments = () => {
    if (
      previousAncestor.selection &&
      'arguments' in previousAncestor.selection &&
      previousAncestor.selection.arguments &&
      previousAncestor.selection.arguments.length > 1
    ) {
      return true;
    }
    return false;
  };

  if (!hasSiblingArguments()) {
    // remove argument, variable, and brackets
    console.log('REMOVE_ARGUMENT: !hasSiblingArguments', {});

    return pushEdit({
      edits: [
        {
          range: useEditor
            .getState()
            .getActiveTab()
            ['operationsModel'].getFullModelRange(),
          text: null,
        },
      ],
      position,
      targetEditor: TARGET_EDITOR,
    });
  }

  if (hasSiblingArguments()) {
    // remove argument and variable
  }
};
