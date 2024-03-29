import { GraphQLSchema, isEnumType } from 'graphql';

export const getEnumValues = ({
  enumTypeName,
  schema,
}: {
  enumTypeName: string;
  schema: GraphQLSchema;
}): Array<{ name: string; value: string }> | undefined => {
  if (!schema || 'error' in schema) {
    return undefined;
  }

  const enumType = schema.getType(enumTypeName);

  if (!isEnumType(enumType)) {
    return undefined;
  }

  return enumType.getValues().map((v) => ({
    value: v.value,
    name: v.name,
    description: v.description || undefined,
  }));
};
