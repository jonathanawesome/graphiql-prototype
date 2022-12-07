import { GraphQLInputFieldMap, isInputObjectType } from 'graphql';

// components
import { ListItem, ScalarArg } from '../index';
import { Message } from '@graphiql-prototype/ui-library';

// hooks
import { AncestorArgument, AncestorField, AncestorsArray } from '../../hooks';

// styles
import { StyledInputObject } from './styles';

export const InputObject = ({
  ancestors,
  fields,
  isNested,
}: {
  ancestors: AncestorsArray;
  fields: GraphQLInputFieldMap;
  isNested: boolean;
}) => {
  const { argument, selection } = ancestors[ancestors.length - 1] as AncestorArgument;

  const isSelected = !!selection;

  const { selection: ancestorSelection } = ancestors[
    ancestors.length - 2
  ] as AncestorField;

  // console.log('rendering InputObject', {
  //   isSelected,
  //   argument,
  // });

  return (
    <div className={StyledInputObject()}>
      <ListItem
        ancestors={ancestors}
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
                isDisabled: !ancestorSelection,
                isSelected,
                variant: 'ARGUMENT',
              }
        }
        type={argument}
        variant="INPUT_OBJECT"
      />
    </div>
  );
};
