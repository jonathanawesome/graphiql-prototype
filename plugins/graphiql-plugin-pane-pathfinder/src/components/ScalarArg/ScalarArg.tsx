import { GraphQLArgument, isRequiredArgument, OperationTypeNode } from 'graphql';

// components
import { Describe } from '../index';
import { IndicatorArgument } from '../../icons';

// hooks
import {
  AncestorArgument,
  AncestorInputField,
  AncestorMap,
  usePathfinder,
} from '../../hooks';

// styles
import { IndicatorArgumentWrap, ScalarArgStyled } from './styles';

const toggle = usePathfinder.getState().toggle;

export const ScalarArg = ({
  ancestors,
  operationType,
}: {
  ancestors: AncestorMap;
  operationType: OperationTypeNode;
}) => {
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
  //   ancestors,
  //   operationType,
  // });

  return (
    <ScalarArgStyled>
      <button onClick={() => toggle({ ancestors, operationType })}>
        <IndicatorArgumentWrap isSelected={isSelected}>
          <IndicatorArgument />
        </IndicatorArgumentWrap>
      </button>
      <Describe
        description={argument.description || null}
        isSelected={isSelected}
        name={`${argument.name}${isRequiredArgument(argument) ? `*` : ''}`}
        type={argument.type}
        variant="ARGUMENT"
      />
    </ScalarArgStyled>
  );
};
