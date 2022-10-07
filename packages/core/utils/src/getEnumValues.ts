import { isEnumType } from 'graphql';

// hooks
import { useSchema } from '@graphiql-prototype/store';

export const getEnumValues = ({
  enumTypeName,
}: {
  enumTypeName: string;
}): Array<{ name: string; value: string }> | undefined => {
  const schema = useSchema.getState().schema;

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
