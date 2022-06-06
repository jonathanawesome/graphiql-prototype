import {
  ArgumentNode,
  GraphQLField,
  isInputObjectType,
  isRequiredArgument,
  Kind,
} from 'graphql';

/** utils */
import { unwrapInputType } from '@graphiql-v2-prototype/graphiql-v2';
import { buildObjectFields } from './buildObjectFields';
import { capitalize } from './capitalize';

export const getRequiredArgumentNodesForField = ({
  field,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
              value: `${fieldName}${capitalize(arg.name)}`,
            },
          },
        };
      }
    } else {
      return [];
    }
  });
};
