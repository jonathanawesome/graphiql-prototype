import { useEditor } from '@graphiql-prototype/store';
import {
  FieldNode,
  InlineFragmentNode,
  Kind,
  OperationDefinitionNode,
  print,
  SelectionNode,
} from 'graphql';

import { AncestorRoot, AncestorsArray } from '../types';

const updateModel = useEditor.getState().updateModel;

export const insertNewOperation = ({ ancestors }: { ancestors: AncestorsArray }) => {
  // console.log('insert new operation', {
  //   ancestors,
  // });
  const operationDefinition: OperationDefinitionNode = {
    kind: Kind.OPERATION_DEFINITION,
    name: {
      kind: Kind.NAME,
      value: `new${(ancestors[0] as AncestorRoot).operationType}`,
    },
    operation: (ancestors[0] as AncestorRoot).operationType,
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

  console.log('newNodes', { newNodes, ancestors });

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

  return updateModel({
    targetModel: 'operationsModel',
    text: print(newOperationDefinitionNode),
  });
};
