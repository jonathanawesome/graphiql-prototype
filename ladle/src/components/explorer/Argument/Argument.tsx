import cuid from 'cuid';
import {
  FieldNode,
  GraphQLArgument,
  isEnumType,
  isInputObjectType,
  isLeafType,
  isListType,
  isNonNullType,
  isRequiredArgument,
  isScalarType,
  Kind,
  ObjectFieldNode,
} from 'graphql';

/** components */
import { InputType, ScalarArg } from '@/components';

/** styles */
import { ArgumentStyled } from './styles';

/** utils */
import { capitalize, unwrapInputType } from '@/utils';
import { AncestorArgument, AncestorField, AncestorInputType, AncestorMap } from '@/hooks';

export const Argument = ({
  ancestors,
  arg,
  onFieldName,
  selection,
}: {
  ancestors: AncestorMap;
  arg: GraphQLArgument;
  onFieldName: string;
  selection: FieldNode | ObjectFieldNode | null;
}) => {
  const hash = cuid();
  let toRender: React.ReactNode | null = null;

  const parentAncestor: AncestorField | AncestorInputType = ancestors
    .values()
    .next().value;

  const variableName = () => {
    if ('onInputType' in parentAncestor) {
      return `${onFieldName}${capitalize({
        string: parentAncestor.onInputType,
      })}${capitalize({ string: arg.name })}`;
    } else if ('field' in parentAncestor) {
      return `${onFieldName}${capitalize({ string: arg.name })}`;
    }
    return ``;
  };

  // console.log('Argument', {
  //   ancestors,
  //   arg,
  //   onFieldName,
  //   selection,
  //   parentAncestor,
  // });

  const newInputTypeArgumentMap = new Map([
    [
      // hash = safety first!
      `${arg.name}-${hash}`,
      {
        onInputType: arg.name,
        parent: parentAncestor.selection,
        selection:
          selection?.kind === Kind.FIELD
            ? selection?.arguments?.find((a) => a.name.value === arg.name)
            : undefined,
      } as AncestorInputType,
    ],
    ...ancestors,
  ]);

  const newScalarArgAncestorMap = new Map([
    [
      // hash = safety first!
      `${arg.name}-${hash}`,
      {
        arg,
        onInputTypeName:
          'onInputType' in parentAncestor ? parentAncestor.onInputType : 'null',
        parentSelection: parentAncestor.selection,
        placement: 'onInputType' in parentAncestor ? 'ON_INPUT_TYPE' : 'ON_FIELD',
        selection:
          selection?.kind === Kind.OBJECT_FIELD
            ? selection
            : selection?.arguments?.find((a) => a.name.value === arg.name),
        variableName: variableName(),
      } as AncestorArgument,
    ],
    ...ancestors,
  ]);

  if (isInputObjectType(arg.type)) {
    toRender = (
      <InputType
        ancestors={newInputTypeArgumentMap}
        inputType={arg.type}
        isRequired={isRequiredArgument(arg)}
        onFieldName={onFieldName}
      />
    );
  } else if (isNonNullType(arg.type) || isListType(arg.type)) {
    const unwrappedInputType = unwrapInputType({ inputType: arg.type });
    if (isScalarType(unwrappedInputType)) {
      toRender = <ScalarArg ancestors={newScalarArgAncestorMap} />;
    } else if (isInputObjectType(unwrappedInputType)) {
      console.log({ unwrappedInputType });
      toRender = (
        <InputType
          ancestors={newInputTypeArgumentMap}
          inputType={unwrappedInputType}
          isRequired={isRequiredArgument(arg)}
          onFieldName={onFieldName}
        />
      );
    } else if (isEnumType(unwrappedInputType)) {
      //TODO handle EnumType
      toRender = <ScalarArg ancestors={newScalarArgAncestorMap} />;
    }
  } else if (isLeafType(arg.type)) {
    toRender = <ScalarArg ancestors={newScalarArgAncestorMap} />;
  } else {
    toRender = (
      <p style={{ color: 'red' }}>
        {`yikes...something went wrong with this type ${arg.type}`}
      </p>
    );
  }
  return <ArgumentStyled>{toRender}</ArgumentStyled>;
};
