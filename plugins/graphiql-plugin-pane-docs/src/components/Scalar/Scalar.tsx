import { GraphQLScalarType } from 'graphql';

// components
import { Description } from '../Description';

export const Scalar = ({ type }: { type: GraphQLScalarType }) => {
  // console.log('Scalar', type);
  return (
    <Description
      copy={
        type.description && type.description.length > 0
          ? type.description
          : `No description`
      }
    />
  );
};
