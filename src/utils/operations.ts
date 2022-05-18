/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentNode,
  DocumentNode,
  FieldNode,
  GraphQLArgument,
  GraphQLField,
  isRequiredArgument,
  Kind,
  NamedTypeNode,
  parse,
  SelectionNode,
  SelectionSetNode,
  VariableDefinitionNode,
  VariableNode,
} from 'graphql';

/** types */
import { EditFieldAction } from '@/types';

/** utils */
import { capitalize } from './misc';
import { getObjectType } from './schema';

export const parseQuery = (queryText: string): DocumentNode | null | Error => {
  try {
    if (!queryText.trim()) {
      return null;
    }

    return parse(queryText, { noLocation: true });
  } catch (err) {
    return err as Error;
  }
};

export const editFieldSelection = ({
  original,
  action,
}: {
  original: readonly SelectionNode[];
  action: EditFieldAction;
}): SelectionNode[] => {
  switch (action.type) {
    case 'addField': {
      // console.log(`running addField in editFieldSelection, action:`, { action });

      const field = action.payloads;
      const fieldObjectType = getObjectType(field.type);

      const subSelectionSet: SelectionSetNode | undefined = (() => {
        if (!fieldObjectType) {
          return undefined;
        }

        const typeFields = fieldObjectType.getFields();
        const autoField = typeFields['id'] ? 'id' : Object.keys(typeFields)[0];

        return {
          kind: Kind.SELECTION_SET,
          selections: [
            {
              kind: Kind.FIELD,
              name: {
                kind: Kind.NAME,
                value: autoField,
              },
            },
          ],
        };
      })();

      return [
        ...original,
        {
          kind: Kind.FIELD,
          name: {
            kind: Kind.NAME,
            value: action.payloads.name,
          },
          arguments: getArgumentNodes({
            args: action.payloads.args as GraphQLArgument[],
            fieldName: action.payloads.name,
            onlyRequired: true,
          }),
          selectionSet: subSelectionSet,
        },
      ];
    }
    case 'removeField': {
      // console.log(`running removeField in editFieldSelection:`, { action });

      return (original as FieldNode[]).filter(
        (item) => item.name.value !== action.payloads.name
      );
    }
    case 'updateField': {
      // console.log(`running updateField in editFieldSelection:`, { action });
      const fieldNodes = (original as FieldNode[]).map((item) => {
        if (item.name.value === action.payloads.field.name.value) {
          return action.payloads.field;
        }
        return item;
      });
      return fieldNodes;
    }
    default: {
      return [...original];
    }
  }
};

export const buildArgumentNode = ({
  argumentName,
  variableName,
}: {
  argumentName: string;
  variableName: string;
}): ArgumentNode => ({
  kind: Kind.ARGUMENT,
  name: {
    kind: Kind.NAME,
    value: argumentName,
  },
  value: {
    ...buildVariableNode({ name: variableName }),
  },
});

const buildNamedTypeNode = ({ type }: { type: string }): NamedTypeNode => ({
  kind: Kind.NAMED_TYPE,
  name: {
    kind: Kind.NAME,
    value: type,
  },
});

const buildVariableNode = ({ name }: { name: string }): VariableNode => ({
  kind: Kind.VARIABLE,
  name: {
    kind: Kind.NAME,
    value: name,
  },
});

export const buildVariableDefinitionNode = ({
  variableName,
  variableType,
}: {
  variableName: string;
  variableType: string;
}): VariableDefinitionNode => ({
  kind: Kind.VARIABLE_DEFINITION,
  variable: {
    ...buildVariableNode({ name: variableName }),
  },
  type: {
    ...buildNamedTypeNode({ type: variableType }),
  },
});

export const getVariableDefinitionsForField = ({
  field,
  onlyRequired,
}: {
  field: GraphQLField<any, any>;
  onlyRequired: boolean;
}): VariableDefinitionNode[] => {
  return field.args.flatMap((arg) => {
    if (onlyRequired) {
      if (isRequiredArgument(arg)) {
        return {
          ...buildVariableDefinitionNode({
            variableName: `${field.name}${capitalize({ string: arg.name })}`,
            variableType: arg.type.toString(),
          }),
        };
      } else {
        return [];
      }
    } else {
      return {
        ...buildVariableDefinitionNode({
          variableName: `${field.name}${capitalize({ string: arg.name })}`,
          variableType: arg.type.toString(),
        }),
      };
    }
  });
};

export const getArgumentNodes = ({
  args,
  fieldName,
  onlyRequired,
}: {
  args: Array<GraphQLArgument>;
  fieldName: string;
  onlyRequired: boolean;
}): readonly ArgumentNode[] => {
  return args.flatMap((arg) => {
    if (onlyRequired) {
      if (isRequiredArgument(arg)) {
        return buildArgumentNode({
          argumentName: arg.name,
          variableName: `${fieldName}${capitalize({ string: arg.name })}`,
        });
      } else {
        return [];
      }
    } else {
      return buildArgumentNode({
        argumentName: arg.name,
        variableName: `${fieldName}${capitalize({ string: arg.name })}`,
      });
    }
  });
};
