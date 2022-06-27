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
import { useDocs } from '@graphiql-v2-prototype/graphiql-plugin-pane-docs';

// icons
import { IndicatorArgument } from '../../icons';

// styles
import { IndicatorArgumentWrap, ScalarArgStyled } from './styles';

// utils
import { unwrapType } from '../../utils';

const toggle = usePathfinder.getState().toggle;

export const ScalarArg = ({
  ancestors,
  operationType,
}: {
  ancestors: AncestorMap;
  operationType: OperationTypeNode;
}) => {
  const { descriptionsVisibility } = usePathfinder();
  const { navigateForward } = useDocs();

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
        // type={argument.type.toString()}
        type={
          <button
            onClick={() => {
              navigateForward({
                docPane: {
                  description: argument.description || null,
                  name: unwrapType(argument.type).toString(),
                  type: argument.type,
                },
                placement: 'PATHFINDER',
              });
            }}
          >
            {argument.type.toString()}
          </button>
        }
        entityType="ARGUMENT"
      />
    </ScalarArgStyled>
  );
};
