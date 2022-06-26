import { GraphQLScalarType } from 'graphql';

// components
import { DocsDescription } from '../DocsDescription';

export const Scalar = ({ type }: { type: GraphQLScalarType }) => {
  console.log('Scalar', type);
  return (
    <DocsDescription
      copy={
        type.description && type.description.length > 0
          ? type.description
          : `No description`
      }
    />
  );
};
