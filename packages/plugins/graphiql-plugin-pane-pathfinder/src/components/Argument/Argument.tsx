import { isInputObjectType } from 'graphql';

// components
import { InputObject, ScalarArg } from '../index';

// hooks
import type { AncestorArgument, AncestorsArray } from '../../hooks';

// utils
import { unwrapNonNullArgumentType } from '../../utils';

export const Argument = ({ ancestors }: { ancestors: AncestorsArray }) => {
  const { argument, selection } = ancestors[ancestors.length - 1] as AncestorArgument;

  const unwrappedNonNullType = unwrapNonNullArgumentType({ argumentType: argument.type });

  // console.log('Argument', {
  //   name: argument.name,
  //   selection,
  //   ancestors,
  // });

  const newAncestors = [
    ...ancestors,
    {
      type: 'ARGUMENT',
      argument,
      selection,
    } as AncestorArgument,
  ];
  let toRender: React.ReactNode | null = null;

  if (isInputObjectType(unwrappedNonNullType)) {
    toRender = (
      <InputObject
        ancestors={newAncestors}
        fields={unwrappedNonNullType.getFields()}
        isNested={false}
      />
    );
  } else {
    toRender = (
      <ScalarArg ancestors={newAncestors} argument={argument} onInputType={null} />
    );
  }

  return <>{toRender}</>;
};
