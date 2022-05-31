/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentNode,
  DocumentNode,
  GraphQLField,
  GraphQLInputField,
  isInputObjectType,
  isRequiredArgument,
  Kind,
  ObjectFieldNode,
  parse,
} from 'graphql';

/** utils */
import { capitalize } from './misc';
import { unwrapInputType } from './arg';

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

// const buildArgumentNode = ({
//   argumentName,
//   variableName,
// }: {
//   argumentName: string;
//   variableName: string;
// }): ArgumentNode => ({
//   kind: Kind.ARGUMENT,
//   name: {
//     kind: Kind.NAME,
//     value: argumentName,
//   },
//   value: {
//     ...buildVariableNode({ name: variableName }),
//   },
// });

// const buildVariableNode = ({ name }: { name: string }): VariableNode => ({
//   kind: Kind.VARIABLE,
//   name: {
//     kind: Kind.NAME,
//     value: name,
//   },
// });

const buildObjectFields = ({
  argName,
  childFields,
  parentFieldName,
}: {
  argName: string;
  childFields: GraphQLInputField[];
  parentFieldName: string;
}): ObjectFieldNode[] => {
  return childFields.map((f) => ({
    // readonly value: ValueNode;
    kind: Kind.OBJECT_FIELD,
    name: {
      kind: Kind.NAME,
      value: f.name,
    },
    value: {
      kind: Kind.VARIABLE,
      name: {
        kind: Kind.NAME,
        value: `${parentFieldName}${capitalize({
          string: argName,
        })}${capitalize({ string: f.name })}`,
      },
    },
  }));
};

export const getRequiredArgumentNodesForField = ({
  field,
}: {
  field: GraphQLField<any, any>;
}): ArgumentNode[] => {
  const { args, name: fieldName } = field;

  return args.flatMap((arg) => {
    const unwrappedInputType = unwrapInputType({ inputType: arg.type });

    // console.log({ arg, unwrappedInputType });

    //return only required ArgumentNodes
    if (isRequiredArgument(arg)) {
      if (isInputObjectType(unwrappedInputType)) {
        const fieldsOnInputObjectType = unwrappedInputType.getFields();
        const requiredChildFields = Object.keys(fieldsOnInputObjectType).flatMap((f) => {
          if (isRequiredArgument(fieldsOnInputObjectType[f])) {
            return fieldsOnInputObjectType[f];
          } else {
            return [];
          }
        });

        // this is a required input object, so we return it and any of it's required fields
        return {
          kind: Kind.ARGUMENT,
          name: {
            kind: Kind.NAME,
            value: arg.name,
          },
          value: {
            kind: Kind.OBJECT,
            fields: buildObjectFields({
              argName: arg.name,
              parentFieldName: fieldName,
              childFields: requiredChildFields,
            }),
          },
        };
      } else {
        // not an inputObject, let's return an argumentNode
        return {
          kind: Kind.ARGUMENT,
          name: {
            kind: Kind.NAME,
            value: arg.name,
          },
          value: {
            kind: Kind.VARIABLE,
            name: {
              kind: Kind.NAME,
              value: `${fieldName}${capitalize({ string: arg.name })}`,
            },
          },
        };
      }
    } else {
      return [];
    }
  });
};
