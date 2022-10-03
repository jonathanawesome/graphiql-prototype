import cuid from 'cuid';
import {
  FieldNode,
  GraphQLArgument,
  isInputObjectType,
  OperationTypeNode,
} from 'graphql';

// components
import { InputObject, ScalarArg } from '../index';

// hooks
import type { AncestorMap } from '../../hooks';

// utils
import {
  capitalize,
  generateVariableNameFromAncestorMap,
  unwrapNonNullArgumentType,
} from '../../utils';

export const Argument = ({
  ancestors,
  argument,
  operationType,
  selection,
}: {
  ancestors: AncestorMap;
  argument: GraphQLArgument;
  operationType: OperationTypeNode;
  selection: FieldNode | null;
}) => {
  const unwrappedNonNullType = unwrapNonNullArgumentType({ argumentType: argument.type });

  // console.log('Argument', {
  //   name: argument.name,
  //   selection,
  // });

  const hash = cuid.slug();

  const newArgMap = new Map([
    [
      // hash = safety first!
      `${argument.name}-${hash}`,
      {
        argument,
        selection: selection?.arguments?.find((a) => a.name.value === argument.name),
        variableName: `${generateVariableNameFromAncestorMap({
          ancestors,
          variableType: 'ARGUMENT',
        })}${capitalize(argument.name)}`,
      },
    ],
    ...ancestors,
  ]);

  let toRender: React.ReactNode | null = null;

  if (isInputObjectType(unwrappedNonNullType)) {
    toRender = (
      <InputObject
        ancestors={newArgMap}
        argument={argument}
        inputObjectType={unwrappedNonNullType}
        isNested={false}
        operationType={operationType}
      />
    );
  } else {
    toRender = (
      <ScalarArg
        ancestors={newArgMap}
        argument={argument}
        onInputType={false}
        operationType={operationType}
      />
    );
  }

  return <>{toRender}</>;
};
