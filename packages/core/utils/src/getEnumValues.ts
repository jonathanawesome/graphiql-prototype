import { isEnumType } from 'graphql';

// hooks
import { useSchema } from '@graphiql-prototype/use-schema';

// types
import { FieldSelectOption } from '@graphiql-prototype/ui-library';

export const getEnumValues = ({
  enumTypeName,
}: {
  enumTypeName: string;
}): Array<FieldSelectOption> | undefined => {
  console.log('getEnumValues', enumTypeName);
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
