import { isEnumType } from 'graphql';

// hooks
import { useGraphiQLEditor } from '../hooks';

// types
import { FieldSelectOption } from '@graphiql-v2-prototype/graphiql-ui-library';

export const getEnumValues = ({
  enumTypeName,
}: {
  enumTypeName: string;
}): Array<FieldSelectOption> | undefined => {
  const schema = useGraphiQLEditor.getState().schema;

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
