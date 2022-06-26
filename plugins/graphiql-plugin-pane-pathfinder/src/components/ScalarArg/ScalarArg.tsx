import { GraphQLArgument, isRequiredArgument, OperationTypeNode } from 'graphql';

// components
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';

// hooks
import {
  AncestorArgument,
  AncestorInputField,
  AncestorMap,
  usePathfinder,
} from '../../hooks';

// icons
import { IndicatorArgument } from '../../icons';

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
  const { descriptionsVisibility } = usePathfinder();

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

      <DescriptionListItem
        descriptionPlacement={descriptionsVisibility}
        description={argument.description || null}
        isSelected={isSelected}
        name={`${argument.name}${isRequiredArgument(argument) ? `*` : ''}`}
        type={argument.type.toString()}
        entityType="ARGUMENT"
      />
    </ScalarArgStyled>
  );
};
