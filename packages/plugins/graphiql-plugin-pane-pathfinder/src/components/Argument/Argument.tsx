import { ArgumentNode, GraphQLArgument, isInputObjectType } from 'graphql';

// components
import { InputObject, ScalarArg } from '../index';

// hooks
import type { AncestorsArray } from '../../hooks';

// utils
import { unwrapNonNullArgumentType } from '../../utils';

export const Argument = ({
  ancestors,
  argument,
  selection,
}: {
  ancestors: AncestorsArray;
  argument: GraphQLArgument;
  selection: ArgumentNode | undefined;
}) => {
  const unwrappedNonNullType = unwrapNonNullArgumentType({ argumentType: argument.type });

  // console.log('Argument', {
  //   name: argument.name,
  //   selection,
  // });

  const newArgMap = [
    ...ancestors,
    {
      argument,
      selection,
      variableName: argument.name,
    },
  ];
  let toRender: React.ReactNode | null = null;

  if (isInputObjectType(unwrappedNonNullType)) {
    toRender = (
      <InputObject
        ancestors={newArgMap}
        argument={argument}
        inputObjectType={unwrappedNonNullType}
        isNested={false}
      />
    );
  } else {
    toRender = <ScalarArg ancestors={newArgMap} argument={argument} onInputType={null} />;
  }

  return <>{toRender}</>;
};
