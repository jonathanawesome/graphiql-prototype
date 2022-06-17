import { isEnumType } from 'graphql';

/** hooks */
import { useGraphiQLEditor } from '../hooks';

export const getEnumValues = ({
  enumTypeName,
}: {
  enumTypeName: string;
}): Array<{ value: string; name: string; description?: string }> | undefined => {
  const schema = useGraphiQLEditor.getState().schema;

  if (!schema) {
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
