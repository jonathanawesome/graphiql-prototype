import cuid from 'cuid';
import {
  FieldNode,
  GraphQLArgument,
  isEnumType,
  isInputObjectType,
  isLeafType,
  isListType,
  isNonNullType,
  isScalarType,
} from 'graphql';

/** components */
import { InputObject, ScalarArg } from '../index';

/** hooks */
import type { AncestorArgument, AncestorInputObject, AncestorMap } from '../../hooks';

/** utils */
import {
  capitalize,
  generateVariableNameFromAncestorMap,
  unwrapInputType,
} from '../../utils';

export const Argument = ({
  ancestors,
  argument,
  selection,
}: {
  ancestors: AncestorMap;
  argument: GraphQLArgument;
  selection: FieldNode | null;
}) => {
  // console.log('Argument', {
  //   argument,
  // });

  const hash = cuid.slug();

  const newInputObjectMap = new Map([
    [
      // hash = safety first!
      `${argument.name}-${hash}`,
      {
        inputObject: argument.type,
        name: argument.name,
        parentType: 'FIELD',
        selection: selection?.arguments?.find((a) => a.name.value === argument.name),
      } as AncestorInputObject,
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
        variableName: `${generateVariableNameFromAncestorMap({ ancestors })}${capitalize(
          argument.name
        )}`,
      } as AncestorArgument,
    ],
    ...ancestors,
  ]);

  //TODO fix this 👇
  let toRender: React.ReactNode | null = null;

  if (isInputObjectType(argument.type)) {
    // rendering top-level InputObject that is NOT required
    toRender = (
      <InputObject
        ancestors={newInputObjectMap}
        renderingInputField={argument}
        inputType={argument.type}
      />
    );
  } else if (isNonNullType(argument.type) || isListType(argument.type)) {
    const unwrappedInputObject = unwrapInputType({ inputType: argument.type });
    if (isScalarType(unwrappedInputObject)) {
      toRender = <ScalarArg ancestors={newScalarArgMap} />;
    } else if (isInputObjectType(unwrappedInputObject)) {
      toRender = (
        // rendering top-level InputObject that IS required
        <InputObject
          ancestors={newInputObjectMap}
          renderingInputField={argument}
          inputType={unwrappedInputObject}
        />
      );
    } else if (isEnumType(unwrappedInputObject)) {
      //TODO handle EnumType
      toRender = <ScalarArg ancestors={newScalarArgMap} />;
    }
  } else if (isLeafType(argument.type)) {
    toRender = <ScalarArg ancestors={newScalarArgMap} />;
  } else {
    toRender = (
      <p style={{ color: 'red' }}>
        {`yikes...something went wrong with this type ${argument.type}`}
      </p>
    );
  }
  return <>{toRender}</>;
};
