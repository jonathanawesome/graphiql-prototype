import { GraphQLInputField, isRequiredArgument } from 'graphql';

/** components */
import { IndicatorArgument, Describe } from '../index';

/** hooks */
import { AncestorInputField, AncestorMap, usePathfinder } from '../../hooks';

/** styles */
import { InputFieldStyled } from './styles';

const toggle = usePathfinder.getState().toggle;

export const InputField = ({
  ancestors,
  inputField,
}: {
  ancestors: AncestorMap;
  inputField: GraphQLInputField;
}) => {
  const { selection } = ancestors.values().next().value as AncestorInputField;

  // console.log('rendering InputField', {
  //   inputField,
  //   ancestors,
  //   ancestorNext: { selection },
  // });

  return (
    <InputFieldStyled>
      <button onClick={() => toggle({ ancestors })}>
        <IndicatorArgument isSelected={!!selection} />
      </button>
      <Describe
        name={`${inputField.name}${isRequiredArgument(inputField) ? `*` : ''}`}
        description={inputField.description || null}
        isSelected={!!selection}
        type={inputField.type}
        variant="ARGUMENT"
      />
    </InputFieldStyled>
  );
};
