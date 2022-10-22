import { print, Kind } from 'graphql';
import type { ArgumentNode, Location, VariableDefinitionNode } from 'graphql';

// constants
import { TARGET_EDITOR } from '../../constants';

// hooks
import { useEditor } from '@graphiql-prototype/store';

import { AncestorArgument, AncestorField, AncestorRoot } from '../../types';

export const handleArgument = ({
  previousAncestor,
  rootAncestor,
  target,
}: {
  previousAncestor: AncestorField;
  rootAncestor: AncestorRoot;
  target: AncestorArgument;
}) => {
  const pushEdit = useEditor.getState().pushEdit;

  const argumentTargetLocation = previousAncestor.selection?.loc as Location;

  const variableTargetLocation = rootAncestor.operationDefinition?.loc as Location;

  const newVariableDefinitionNode: VariableDefinitionNode = {
    kind: Kind.VARIABLE_DEFINITION,
    variable: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: target.argument.name,
      },
    },
    type: {
      kind: Kind.NAMED_TYPE,
      name: {
        kind: Kind.NAME,
        value: target.argument.type.toString(),
      },
    },
  };
  const newArgumentNode: ArgumentNode = {
    kind: Kind.ARGUMENT,
    name: {
      kind: Kind.NAME,
      value: target.argument.name,
    },
    value: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: target.argument.name,
      },
    },
  };
  const argumentText = `(${print(newArgumentNode)})`;
  const variableText = `(${print(newVariableDefinitionNode)})`;
  console.log('isArgument', {
    target,
    argumentTargetLocation,
    variableTargetLocation,
    printedArgument: argumentText,
    printedVariable: variableText,
  });

  return pushEdit({
    edits: [
      {
        range: {
          startLineNumber: variableTargetLocation.startToken.line,
          endLineNumber: variableTargetLocation.startToken.line,
          startColumn:
            (variableTargetLocation.startToken.next?.column as number) +
            (variableTargetLocation.startToken.next?.value as string).length,
          endColumn:
            (variableTargetLocation.startToken.next?.column as number) +
            (variableTargetLocation.startToken.next?.value as string).length,
        },
        text: variableText,
      },
      {
        range: {
          startLineNumber: argumentTargetLocation.startToken.line,
          endLineNumber: argumentTargetLocation.startToken.line,
          startColumn:
            argumentTargetLocation.startToken.column +
            argumentTargetLocation.startToken.value.length,
          endColumn:
            argumentTargetLocation.startToken.column +
            argumentTargetLocation.startToken.value.length,
        },
        text: argumentText,
      },
    ],
    targetEditor: TARGET_EDITOR,
  });
};
