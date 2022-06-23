import {
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLScalarType,
  GraphQLType,
  GraphQLUnionType,
} from 'graphql';

// styles
import { StyledPill, StyledPills } from './styles';

// utils
import { unwrapType } from '../../utils';

const typer = ({ type }: { type: GraphQLType }) => {
  let name = 'Whoops!';
  if (type instanceof GraphQLNonNull) {
    name = 'Nonnull';
  } else if (type instanceof GraphQLObjectType) {
    name = 'Object';
  } else if (type instanceof GraphQLInterfaceType) {
    name = 'Interface';
  } else if (type instanceof GraphQLUnionType) {
    name = 'Union';
  } else if (type instanceof GraphQLEnumType) {
    name = 'Enum';
  } else if (type instanceof GraphQLInputObjectType) {
    name = 'InputObject';
  } else if (type instanceof GraphQLList) {
    name = 'List';
  } else if (type instanceof GraphQLScalarType) {
    name = 'Scalar';
  }
  return name;
};

export const Pills = ({ type }: { type: GraphQLType }) => {
  const name = typer({ type });

  return (
    <StyledPills>
      <StyledPill>{name}</StyledPill>
      {name === 'Nonnull' && <StyledPill>{typer({ type: unwrapType(type) })}</StyledPill>}
    </StyledPills>
  );
};
