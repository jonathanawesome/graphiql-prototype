import {
  FieldNode,
  InlineFragmentNode,
  Kind,
  OperationDefinitionNode,
  print,
  SelectionNode,
} from 'graphql';
import { IRange } from 'monaco-editor';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// types
import { AncestorField, AncestorRoot, AncestorsArray } from '../types';

const pushEdit = useEditor.getState().pushEdit;

export const insertNewOperation = ({
  ancestors,
  range,
}: {
  ancestors: AncestorsArray;
  range?: IRange;
}) => {
  console.log('insert new operation', {
    ancestors,
  });

  const operationType = (ancestors[0] as AncestorRoot).operationType;
  const topLevelFieldName = (ancestors[1] as AncestorField).field.name;

  const operationDefinition: OperationDefinitionNode = {
    kind: Kind.OPERATION_DEFINITION,
    name: {
      kind: Kind.NAME,
      value: `new${
        topLevelFieldName.charAt(0).toUpperCase() + topLevelFieldName.slice(1)
      }${operationType.charAt(0).toUpperCase() + operationType.slice(1)}`,
    },
    operation: operationType,
    selectionSet: {
      kind: Kind.SELECTION_SET,
      selections: [],
    },
  };

  const newNodes = [...ancestors].reverse().reduce((acc, a) => {
    if (a.type === 'FIELD') {
      const fieldNode: FieldNode = {
        kind: Kind.FIELD,
        name: {
          kind: Kind.NAME,
          value: a.field.name,
        },
        selectionSet: {
          kind: Kind.SELECTION_SET,
          selections: [],
        },
      };
      acc.push(fieldNode);
    }
    if (a.type === 'INLINE_FRAGMENT') {
      const inlineFragmentNode: InlineFragmentNode = {
        kind: Kind.INLINE_FRAGMENT,
        typeCondition: {
          kind: Kind.NAMED_TYPE,
          name: { kind: Kind.NAME, value: a.onType },
        },
        selectionSet: {
          kind: Kind.SELECTION_SET,
          selections: [],
        },
      };
      acc.push(inlineFragmentNode);
    }
    return acc;
  }, [] as Array<FieldNode | InlineFragmentNode>);

  const selections = (): SelectionNode[] => {
    let node = newNodes.shift() as FieldNode | InlineFragmentNode;
    newNodes.forEach((newNode) => {
      node = {
        ...newNode,
        selectionSet: {
          kind: Kind.SELECTION_SET,
          selections: [node],
        },
      };
    });

    return [node];
  };

  const newOperationDefinitionNode: OperationDefinitionNode = {
    ...operationDefinition,
    selectionSet: {
      kind: Kind.SELECTION_SET,
      selections: selections(),
    },
  };

  const newLines = useEditor.getState().documentDefinitions > 0 ? '\n\n' : '';

  const printedNode = `${print(newOperationDefinitionNode)}`;

  const text = `${newLines}${printedNode}`;

  return pushEdit({
    edits: [{ range: range || undefined, text }],
    // mostly guaranteed that position will be EOF
    position: { column: 1000, lineNumber: 1000 },
    targetEditor: 'operations',
  });
};
