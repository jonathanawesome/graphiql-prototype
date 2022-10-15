// import cuid from 'cuid';
import {
  ArgumentNode,
  GraphQLArgument,
  isInputObjectType,
  OperationTypeNode,
} from 'graphql';

// components
import { InputObject, ScalarArg } from '../index';

// hooks
import type {
  // AncestorMap,
  AncestorsArray,
} from '../../hooks';

// utils
import { unwrapNonNullArgumentType } from '../../utils';

export const Argument = ({
  ancestors,
  argument,
  // operationType,
  selection,
}: {
  // ancestors: AncestorMap;
  ancestors: AncestorsArray;
  argument: GraphQLArgument;
  // operationType: OperationTypeNode;
  selection: ArgumentNode | undefined;
}) => {
  const unwrappedNonNullType = unwrapNonNullArgumentType({ argumentType: argument.type });

  // console.log('Argument', {
  //   name: argument.name,
  //   selection,
  // });

  // const hash = cuid.slug();

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
        // operationType={operationType}
      />
    );
  } else {
    toRender = (
      <ScalarArg
        ancestors={newArgMap}
        argument={argument}
        onInputType={null}
        // operationType={operationType}
      />
    );
  }

  return <>{toRender}</>;
};
