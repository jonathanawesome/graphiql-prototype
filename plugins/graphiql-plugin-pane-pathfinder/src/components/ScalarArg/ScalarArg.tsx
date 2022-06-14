import { GraphQLArgument, isRequiredArgument } from 'graphql';

/** components */
import { Describe, IndicatorArgument } from '../index';

/** hooks */
import {
  AncestorArgument,
  AncestorInputField,
  AncestorMap,
  usePathfinder,
} from '../../hooks';

/** styles */
import { ScalarArgStyled } from './styles';

const toggle = usePathfinder.getState().toggle;

export const ScalarArg = ({ ancestors }: { ancestors: AncestorMap }) => {
  const ancestor = ancestors.values().next().value as
    | AncestorArgument
    | AncestorInputField;

  const isSelected = !!ancestor.selection;

  let argument: GraphQLArgument;

  if ('inputField' in ancestor) {
    argument = ancestor.inputField;
  } else {
    argument = ancestor.argument;
  }

  // console.log('ScalarArg', {
  //   // arg,
  //   ancestors,
  //   self,
  //   argument,
  //   selection,
  //   // selection,
  // });

  return (
    <ScalarArgStyled>
      <button onClick={() => toggle({ ancestors })}>
        <IndicatorArgument isSelected={isSelected} />
      </button>
      <Describe
        name={`${argument.name}${isRequiredArgument(argument) ? `*` : ''}`}
        description={argument.description || null}
        isSelected={isSelected}
        type={argument.type}
        variant="ARGUMENT"
      />
    </ScalarArgStyled>
  );
};
