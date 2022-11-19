// constants
import { TARGET_EDITOR } from '../constants';

// hooks
import { EditorEdit, useEditor, useSchema } from '@graphiql-prototype/store';

// store
import { GraphQLSchema } from 'graphql';

// types
import { AncestorArgument } from '../types';

// utils
import { generateArgumentText, generateVariableText, getRemoveRange } from '../utils';

export const removeTargetArgument = ({ target }: { target: AncestorArgument }) => {
  const schema = useSchema.getState().schema;

  const argument = target.argument;

  const pushEdit = useEditor.getState().pushEdit;

  const position = useEditor.getState().monacoEditors['operations']?.getPosition() || {
    column: 1,
    lineNumber: 1,
  };

  const argumentText = generateArgumentText({
    argument,
    schema: schema as GraphQLSchema,
  });

  const variableText = generateVariableText({
    argument,
  });

  const edits: EditorEdit[] = [];

  const variableRange = getRemoveRange({
    mode: 'VARIABLE_DEFINITION',
    target,
    text: variableText,
  });

  if (variableRange) {
    edits.push({
      range: variableRange,
      text: null,
    });
  }

  const argumentRange = getRemoveRange({
    mode: 'ARGUMENT',
    target,
    text: argumentText,
  });

  if (argumentRange) {
    edits.push({
      range: argumentRange,
      text: null,
    });
  }

  return pushEdit({
    edits,
    position,
    targetEditor: TARGET_EDITOR,
  });
};
