import { useEditor } from '@graphiql-prototype/store';
import { FieldNode, Kind, OperationDefinitionNode, print, SelectionNode } from 'graphql';
import { AncestorRoot, AncestorField, AncestorsArray } from '../types';

const updateModel = useEditor.getState().updateModel;

export const insertNewOperation = ({ ancestors }: { ancestors: AncestorsArray }) => {
  // const parts = get().parts;
  console.log('insert NEWNEWNEW_OPERATION', {
    // parts
    ancestors,
  });
  const operationDefinition: OperationDefinitionNode = {
    kind: Kind.OPERATION_DEFINITION,
    name: {
      kind: Kind.NAME,
      value: `new${(ancestors[0] as AncestorRoot).rootTypeName}`,
    },
    operation: (ancestors[0] as AncestorRoot).rootTypeName,
    selectionSet: {
      kind: Kind.SELECTION_SET,
      selections: [],
    },
  };

  const fields = ancestors
    .slice(1)
    .reverse()
    .map((a) => {
      const field: FieldNode = {
        kind: Kind.FIELD,
        name: {
          kind: Kind.NAME,
          value: (a as AncestorField).field.name,
        },
        selectionSet: {
          kind: Kind.SELECTION_SET,
          selections: [],
        },
      };
      return field;
    });

  const selections = (): SelectionNode[] => {
    let fieldNode = fields.shift() as FieldNode;
    fields.forEach((field) => {
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
    text: newOperationDefinitionNode
      ? print(newOperationDefinitionNode)
      : 'nothing to insert',
  });
};
