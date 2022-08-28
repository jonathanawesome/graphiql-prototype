import { GraphQLInputField, Kind, ObjectFieldNode } from 'graphql';
import { capitalize } from './capitalize';

export const buildObjectFields = ({
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
        value: `${parentFieldName}${capitalize(argName)}${capitalize(f.name)}`,
      },
    },
  }));
};
