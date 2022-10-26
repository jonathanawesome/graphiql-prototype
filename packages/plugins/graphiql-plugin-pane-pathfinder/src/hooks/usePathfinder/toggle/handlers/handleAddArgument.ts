import type { Location } from 'graphql';

// constants
import { TARGET_EDITOR } from '../../constants';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import { AncestorField, AncestorRoot } from '../../types';

// utils
import {
  getVariableDefinitionsCount,
  getSelectedArgumentsCount,
  getAddArgumentEditWithoutSiblings,
  getAddArgumentEditWithSiblings,
  getAddVariableEditWithExistingVariables,
  getAddVariableEditWithoutExistingVariables,
  // hasSiblingArguments as hasSiblingArgumentsFunc,
  // isExistingVariableDefinitions as isExistingVariableDefinitionsFunc,
} from '../../utils';

export const handleAddArgument = ({
  argumentText,
  previousAncestor,
  rootAncestor,
  variableText,
}: {
  argumentText: string;
  previousAncestor: AncestorField;
  rootAncestor: AncestorRoot;
  variableText: string;
}) => {
  const pushEdit = useEditor.getState().pushEdit;

  const position = useEditor.getState().monacoEditors['operations']?.getPosition() || {
    column: 1,
    lineNumber: 1,
  };

  const selectedArgumentsCount = getSelectedArgumentsCount({ previousAncestor });
  const variableDefinitionsCount = getVariableDefinitionsCount();

  console.log('handleAddArgument', {
    selectedArgumentsCount,
    variableDefinitionsCount,
  });

  const argumentTargetLocation = previousAncestor.selection?.loc as Location;

  const variableTargetLocation = rootAncestor.operationDefinition?.loc as Location;

  if (selectedArgumentsCount === 0 && variableDefinitionsCount === 0) {
    console.log(
      '1 - handleAddArgument - selectedArgumentsCount === 0 && variableDefinitionsCount === 0',
      {}
    );

    pushEdit({
      edits: [
        getAddVariableEditWithoutExistingVariables({
          variableTargetLocation,
          variableText,
        }),
        getAddArgumentEditWithoutSiblings({ argumentTargetLocation, argumentText }),
      ],
      position,
      targetEditor: TARGET_EDITOR,
    });

    return useEditor.getState().setDocumentState();
  }

  if (selectedArgumentsCount === 0 && variableDefinitionsCount > 0) {
    console.log(
      '2 - handleAddArgument - selectedArgumentsCount === 0 && variableDefinitionsCount > 0',
      {}
    );

    pushEdit({
      edits: [
        getAddVariableEditWithExistingVariables({ variableTargetLocation, variableText }),
        getAddArgumentEditWithoutSiblings({ argumentTargetLocation, argumentText }),
      ],
      position,
      targetEditor: TARGET_EDITOR,
    });

    return useEditor.getState().setDocumentState();
  }

  if (selectedArgumentsCount > 0 && variableDefinitionsCount > 0) {
    console.log(
      '3 - handleAddArgument - selectedArgumentsCount > 0 && variableDefinitionsCount > 0',
      {}
    );

    pushEdit({
      edits: [
        getAddVariableEditWithExistingVariables({ variableTargetLocation, variableText }),
        getAddArgumentEditWithSiblings({ argumentTargetLocation, argumentText }),
      ],
      position,
      targetEditor: TARGET_EDITOR,
    });

    return useEditor.getState().setDocumentState();
  }

  return console.log('unhandled addArgument...why are we here?');
};
