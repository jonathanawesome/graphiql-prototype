import { GraphQLScalarType } from 'graphql';

// styles
import { Span } from '../styles';

export const ScalarType = ({ scalarType }: { scalarType: GraphQLScalarType }) => {
  console.log('sclaraType', scalarType);
  return (
    <Span>
      {scalarType.description
        ? scalarType.description
        : 'No description provided for this scalar type'}
    </Span>
  );
};
