import { Location } from 'graphql';

// constants
import { ARGUMENT_HANDLING, TARGET_EDITOR } from '../../constants';

// hooks
import { EditorEdit, useEditor } from '@graphiql-prototype/store';

// types
import { AncestorArgument, AncestorField, AncestorRoot } from '../../types';

// utils
import {
  generateArgumentText,
  generateVariableText,
  getAddEdit,
  getSelectedArgumentsCount,
  getVariableDefinitionsCount,
} from '../utils';

export const addTargetArgument = ({
  previousAncestor,
  rootAncestor,
  target,
}: {
  previousAncestor: AncestorField;
  rootAncestor: AncestorRoot;
  target: AncestorArgument;
}) => {
  const pushEdit = useEditor.getState().pushEdit;

  const edits: EditorEdit[] = [];

  // if there's currently a valid cursor position in the operations editor,
  // use it for our final cursor position. otherwise, start of file.
  let position = useEditor.getState().monacoEditors['operations']?.getPosition() || {
    column: 1,
    lineNumber: 1,
  };

  const argumentText = generateArgumentText({
    argument: target.argument,
  });

  const selectedArgumentsCount = getSelectedArgumentsCount({ previousAncestor });

  const argumentTargetLocation = previousAncestor.selection?.loc as Location;

  const argumentEdit = getAddEdit({
    incomingText: argumentText,
    mode: 'ARGUMENT',
    siblingCount: selectedArgumentsCount,
    targetLocation: argumentTargetLocation,
  });

  if (argumentEdit) {
    edits.push({
      range: argumentEdit.range,
      text: argumentEdit.text,
    });
    position = {
      column: argumentEdit.range.endColumn + argumentEdit.text.length,
      lineNumber: argumentEdit.range.endLineNumber,
    };
  }

  if (ARGUMENT_HANDLING === 'WITH_VARIABLE') {
    const variableDefinitionsCount = getVariableDefinitionsCount();

    const variableTargetLocation = rootAncestor.operationDefinition?.loc as Location;

    const variableText = generateVariableText({
      argument: target.argument,
    });

    const variableEdit = getAddEdit({
      incomingText: variableText,
      mode: 'VARIABLE_DEFINITION',
      siblingCount: variableDefinitionsCount,
      targetLocation: variableTargetLocation,
    });

    if (variableEdit) {
      edits.push({
        range: variableEdit.range,
        text: variableEdit.text,
      });
    }
  }

  return pushEdit({
    edits,
    position,
    targetEditor: TARGET_EDITOR,
  });
};
