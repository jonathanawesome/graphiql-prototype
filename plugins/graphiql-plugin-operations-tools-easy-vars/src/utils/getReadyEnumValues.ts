import { isEnumType } from 'graphql';

/** hooks */
import { useGraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';

/** types */
import { SelectInputValue } from '../components/EasyVars/types';

export const getReadyEnumValues = ({
  enumTypeName,
}: {
  enumTypeName: string;
}): SelectInputValue[] | undefined => {
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
