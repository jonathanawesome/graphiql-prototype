import { useEditor } from '@graphiql-prototype/store';
import {
  FieldNode,
  InlineFragmentNode,
  Kind,
  OperationDefinitionNode,
  print,
  SelectionNode,
} from 'graphql';
import { IRange } from 'monaco-editor';

import { AncestorField, AncestorRoot, AncestorsArray } from '../types';

const pushEdit = useEditor.getState().pushEdit;

export const insertNewOperation = ({
  ancestors,
  range,
}: {
  ancestors: AncestorsArray;
  range?: IRange;
}) => {
  // console.log('insert new operation', {
  //   ancestors,
  // });
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

  // const newNodes = ancestors.reduce((result, a) => {
  //   if (['FIELD', 'INLINE_FRAGMENT'].includes(a.type)) {
  //     result.push(a);
  //   }

  //   return result;
  // }, []);

  // const nodes: Array<FieldNode | InlineFragmentNode> = ancestors
  //   // .slice(1)
  //   .reverse()
  //   .filter((a) => {
  //     if (['FIELD', 'INLINE_FRAGMENT'].includes(a.type)) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   .map((a) => {
  //     // let node: FieldNode | InlineFragmentNode;
  //     if (a.type === 'FIELD') {
  //       return {
  //         kind: Kind.FIELD,
  //         name: {
  //           kind: Kind.NAME,
  //           value: a.field.name,
  //         },
  //         selectionSet: {
  //           kind: Kind.SELECTION_SET,
  //           selections: [],
  //         },
  //       } as FieldNode;
  //     }
  //     if (a.type === 'INLINE_FRAGMENT') {
  //       return {
  //         kind: Kind.INLINE_FRAGMENT,
  //         typeCondition: {
  //           kind: Kind.NAMED_TYPE,
  //           name: { kind: Kind.NAME, value: a.onType },
  //         },
  //         selectionSet: {
  //           kind: Kind.SELECTION_SET,
  //           selections: [],
  //         },
  //       } as InlineFragmentNode;
  //     }
  //     // return node;
  //   });

  // console.log('newNodes', { newNodes, ancestors });

  const selections = (): SelectionNode[] => {
    let fieldNode = newNodes.shift() as FieldNode | InlineFragmentNode;
    newNodes.forEach((field) => {
      fieldNode = {
        ...field,
        selectionSet: {
          kind: Kind.SELECTION_SET,
          selections: [fieldNode],
        },
      };
    });

    return [fieldNode];
  };

  const newOperationDefinitionNode: OperationDefinitionNode = {
    ...operationDefinition,
    selectionSet: {
      kind: Kind.SELECTION_SET,
      selections: selections(),
    },
  };

  const text = `${useEditor.getState().documentDefinitions > 0 ? '\n\n' : ''}${print(
    newOperationDefinitionNode
  )}`;

  return pushEdit({
    edits: [{ range: range || undefined, text }],
    targetEditor: 'operations',
  });
};
