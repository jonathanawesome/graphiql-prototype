// import { useEffect, useState } from 'react';
import cuid from 'cuid';
import {
  FieldNode,
  GraphQLArgument,
  GraphQLInputObjectType,
  // isEnumType,
  isInputObjectType,
  // isLeafType,
  // isListType,
  // isNonNullType,
  // isScalarType,
  OperationTypeNode,
} from 'graphql';

// components
import { InputObject, ScalarArg } from '../index';

// hooks
import type {
  //  AncestorArgument, AncestorInputObject,
  AncestorMap,
} from '../../hooks';
// import { useEditor } from '@graphiql-prototype/use-editor';

// utils
import {
  capitalize,
  generateVariableNameFromAncestorMap,
  unwrapNonNullArgumentType,
  // unwrapType,
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
  // const unwrappedType = unwrapType(argument.type);

  // console.log('Argument', {
  //   unwrappedType,
  //   unwrappedNonNullType,
  //   name: argument.name,
  // });

  const hash = cuid.slug();

  const newInputObjectMap = new Map([
    [
      // hash = safety first!
      `${argument.name}-${hash}`,
      {
        inputObject: argument.type as GraphQLInputObjectType,
        isNested: false,
        name: argument.name,
        selection: selection?.arguments?.find((a) => a.name.value === argument.name),
        variableName: `${generateVariableNameFromAncestorMap({
          ancestors,
          variableType: 'ARGUMENT',
        })}${capitalize(argument.name)}`,
      },
    ],
    ...ancestors,
  ]);

  const newScalarArgMap = new Map([
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
        ancestors={newInputObjectMap}
        argument={argument}
        inputObjectType={unwrappedNonNullType}
        operationType={operationType}
      />
    );
  } else {
    toRender = (
      <ScalarArg
        ancestors={newScalarArgMap}
        argument={argument}
        operationType={operationType}
      />
    );
  }

  return <>{toRender}</>;
};
