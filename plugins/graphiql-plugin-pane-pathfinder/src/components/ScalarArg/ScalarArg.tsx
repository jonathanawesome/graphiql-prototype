import { GraphQLArgument, OperationTypeNode } from 'graphql';

// components
import { ListItem } from '../ListItem';

// hooks
import { AncestorArgument, AncestorInputField, AncestorMap } from '../../hooks';

export const ScalarArg = ({
  ancestors,
  argument,
  operationType,
}: {
  ancestors: AncestorMap;
  argument: GraphQLArgument;
  operationType: OperationTypeNode;
}) => {
  const ancestor = ancestors.values().next().value as
    | AncestorArgument
    | AncestorInputField;

  const isSelected = !!ancestor.selection;

  // console.log('ScalarArg', {
  //   argument,
  // });

  return (
    <ListItem
      isSelected={isSelected}
      toggler={{
        ancestors,
        isSelected,
        operationType,
        variant: 'ARGUMENT',
      }}
      type={argument}
      variant="ARGUMENT"
    />
  );
};
