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
import { InputType, ScalarArg } from '@/components';

/** styles */
import { ArgumentStyled } from './styles';

/** types */
import { OnEditSignature } from '@/types';

/** utils */
import { unwrapInputType } from '@/utils';

export const Argument = ({
  arg,
  addArg,
  onEdit,
  onInputTypeArg,
  removeArg,
  selection,
}: {
  arg: GraphQLArgument;
  addArg: ({ argToAdd }: { argToAdd: GraphQLArgument }) => void;
  onEdit: OnEditSignature;
  onInputTypeArg: string | null;
  removeArg: ({ argToRemove }: { argToRemove: GraphQLArgument }) => void;
  selection: FieldNode | null;
}) => {
  // console.log('Argument', {
  //   name: arg.name,
  //   type: arg.type,
  //   arg,
  //   'isRequiredArgument(arg)': isRequiredArgument(arg),
  // });

  let render: React.ReactNode | null = null;

  if (isInputObjectType(arg.type)) {
    render = (
      <InputType
        inputTypeArg={arg}
        fields={arg.type.getFields()}
        selection={selection}
        onEdit={onEdit}
      />
    );
  } else if (isNonNullType(arg.type) || isListType(arg.type)) {
    const unwrappedType = unwrapInputType({ inputType: arg.type });

    if (isScalarType(unwrappedType)) {
      render = (
        <ScalarArg
          arg={arg}
          addArg={addArg}
          onInputTypeArg={onInputTypeArg}
          removeArg={removeArg}
          selection={selection}
        />
      );
    } else if (isInputObjectType(unwrappedType)) {
      render = (
        <InputType
          inputTypeArg={arg}
          fields={unwrappedType.getFields()}
          selection={selection}
          onEdit={onEdit}
        />
      );
    } else if (isEnumType(unwrappedType)) {
      //TODO handle EnumType
    }
  } else if (isLeafType(arg.type)) {
    render = (
      <ScalarArg
        arg={arg}
        selection={selection}
        addArg={addArg}
        removeArg={removeArg}
        onInputTypeArg={onInputTypeArg}
      />
    );
  } else {
    render = (
      <p style={{ color: 'red' }}>
        {`yikes...something went wrong with this type ${arg.type}`}
      </p>
    );
  }
  return <ArgumentStyled>{render}</ArgumentStyled>;
};
