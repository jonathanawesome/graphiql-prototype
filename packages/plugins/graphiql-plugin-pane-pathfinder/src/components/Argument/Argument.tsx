import { isInputObjectType } from 'graphql';

// components
import { InputObject, ScalarArg } from '../index';

// hooks
import type { AncestorArgument, AncestorsArray } from '../../hooks';

// utils
import { unwrapNonNullArgumentType } from '../../utils';

export const Argument = ({ ancestors }: { ancestors: AncestorsArray }) => {
  const { argument } = ancestors[ancestors.length - 1] as AncestorArgument;

  const unwrappedNonNullType = unwrapNonNullArgumentType({ argumentType: argument.type });

  // console.log('Argument', {
  //   name: argument.name,
  //   selection,
  //   ancestors,
  // });

  let toRender: React.ReactNode | null = null;

  if (isInputObjectType(unwrappedNonNullType)) {
    toRender = (
      <InputObject
        ancestors={ancestors}
        fields={unwrappedNonNullType.getFields()}
        isNested={false}
      />
    );
  } else {
    toRender = <ScalarArg ancestors={ancestors} argument={argument} onInputType={null} />;
  }

  return <>{toRender}</>;
};
