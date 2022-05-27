import {
  ArgumentNode,
  FieldNode,
  GraphQLArgument,
  isEnumType,
  isNonNullType,
  isRequiredArgument,
  ObjectFieldNode,
} from 'graphql';

/** components */
import { FieldDetails, IndicatorArgument } from '@/components';

/** styles */
import { ScalarArgStyled } from './styles';

export const ScalarArg = ({
  arg,
  addArg,
  onInputTypeArg,
  removeArg,
  selection,
}: {
  arg: GraphQLArgument;
  addArg: ({ argToAdd }: { argToAdd: GraphQLArgument }) => void;
  onInputTypeArg: string | null;
  removeArg: ({ argToRemove }: { argToRemove: GraphQLArgument }) => void;
  selection: FieldNode | null;
}) => {
  console.log('ScalarArg', {
    name: arg.name,
    type: arg.type,
    arg,
    selection,
  });

  const argSelection = () => {
    let argSelection: ArgumentNode | ObjectFieldNode | null = null;

    if (onInputTypeArg) {
      // we're dealing with an InputObject argument, so we've gotta dig to find our selection
      // first, we find the InputObject argument
      const inputObjectArgument =
        selection?.arguments?.find((a) => a.name.value === onInputTypeArg) || null;

      // if we have an InputObject argument, we ensure that it's an ObjectValueNode, then we try to find our nested/scalar argument
      argSelection =
        (inputObjectArgument &&
          'fields' in inputObjectArgument?.value &&
          inputObjectArgument?.value.fields?.find((x) => x.name.value === arg.name)) ||
        null;
    } else {
      // this isn't an InputObject argument, just a scalar argument
      argSelection =
        (selection?.arguments || []).find((a) => a.name.value === arg.name) || null;
    }
    return argSelection;
  };

  return (
    <ScalarArgStyled>
      <div
        onClick={() => {
          const shouldAdd = !argSelection();
          if (shouldAdd) {
            // console.log({ selection: argSelection() });
            addArg({ argToAdd: arg });
          } else {
            // console.log({ selection: argSelection() });
            removeArg({ argToRemove: arg });
          }
        }}
      >
        <IndicatorArgument isSelected={!!argSelection()} />
      </div>
      <FieldDetails
        name={`${arg.name}${isRequiredArgument(arg) ? `*` : ''}`}
        description={arg.description || null}
        typeName={arg.type.toString()}
        variant="ARGUMENT"
        isSelected={!!argSelection()}
      />
    </ScalarArgStyled>
  );
};
