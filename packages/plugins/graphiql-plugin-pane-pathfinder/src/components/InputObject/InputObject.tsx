import {
  GraphQLArgument,
  GraphQLInputObjectType,
  isInputObjectType,
  // OperationTypeNode,
} from 'graphql';

// components
import { ListItem, ScalarArg } from '../index';

// hooks
import {
  AncestorArgument,
  // AncestorMap,
  AncestorsArray,
} from '../../hooks';

// styles
import { StyledInputObject } from './styles';
import { Message } from '@graphiql-prototype/ui-library';

export const InputObject = ({
  ancestors,
  argument,
  inputObjectType,
  // operationType,
  isNested,
}: {
  // ancestors: AncestorMap;
  ancestors: AncestorsArray;
  argument: GraphQLArgument;
  inputObjectType: GraphQLInputObjectType;
  isNested: boolean;
  // operationType: OperationTypeNode;
}) => {
  const fields = inputObjectType.getFields();

  const previousAncestor = ancestors.values().next().value as AncestorArgument;

  const isSelected = !!previousAncestor.selection;

  // console.log('rendering InputObject', {
  //   isSelected,
  //   previousAncestor,
  // });

  return (
    <StyledInputObject>
      <ListItem
        collapsibleContent={{
          arguments: Object.keys(fields).map((f) => {
            if (isInputObjectType(fields[f].type)) {
              // TODO: address nested InputObject input values => variables editor
              return (
                <Message
                  key={fields[f].name}
                  message={<>todo: nested input object</>}
                  variant="WARNING"
                />
                // <InputObject
                //   key={fields[f].name}
                //   ancestors={new Map([...ancestors])}
                //   argument={argument}
                //   inputObjectType={fields[f].type as GraphQLInputObjectType}
                //   isNested={true}
                //   operationType={operationType}
                // />
              );
            } else {
              return (
                <ScalarArg
                  key={fields[f].name}
                  ancestors={[...ancestors]}
                  argument={fields[f]}
                  onInputType={argument.name}
                  // operationType={operationType}
                />
              );
            }
          }),
        }}
        isSelected={isSelected}
        toggler={
          isNested
            ? undefined
            : {
                ancestors,
                isSelected,
                // operationType,
                variant: 'ARGUMENT',
              }
        }
        type={argument}
        variant="INPUT_OBJECT"
      />
    </StyledInputObject>
  );
};
