/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLInputType, isWrappingType } from 'graphql';

export const unwrapInputType = ({ inputType }: { inputType: GraphQLInputType }) => {
  let unwrappedType = inputType;
  while (isWrappingType(unwrappedType)) {
    unwrappedType = unwrappedType.ofType;
  }
  return unwrappedType;
};
