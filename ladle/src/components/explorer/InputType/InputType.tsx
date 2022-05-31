import { useState } from 'react';

import {
  ArgumentNode,
  FieldNode,
  GraphQLArgument,
  GraphQLInputObjectType,
  Kind,
  ObjectFieldNode,
  // ObjectValueNode,
} from 'graphql';

/** components */
import { Argument, Caret, FieldDetails } from '@/components';

/** styles */
import { Content, Root, Trigger, TriggerWrap, InputTypeChildArguments } from './styles';

import { AncestorInputType, AncestorMap } from '@/hooks';

export const InputType = ({
  ancestors,
  inputType,
  isRequired,
  onFieldName,
}: {
  ancestors: AncestorMap;
  inputType: GraphQLInputObjectType;
  isRequired: boolean;
  onFieldName: string;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const fields = inputType.getFields();

  const { onInputType, selection } = ancestors.values().next().value as AncestorInputType;

  // console.log('rendering InputType', {
  //   inputType,
  //   ancestors,
  //   onInputType,
  //   selection,
  // });

  const getChildSelection = ({
    arg,
    selection,
  }: {
    arg: GraphQLArgument;
    selection: ArgumentNode | undefined;
  }) => {
    let childSelection: FieldNode | ObjectFieldNode | null = null;

    if (!selection) {
      childSelection = null;
    } else if (selection.value.kind === Kind.OBJECT) {
      const hasSelection = selection.value.fields.find((f) => f.name.value === arg.name);
      if (hasSelection) {
        return hasSelection;
      } else {
        return null;
      }
    }
    return childSelection;
  };

  return (
    <Root open={isExpanded} onOpenChange={setIsExpanded}>
      <TriggerWrap>
        <Trigger>
          <Caret isExpanded={isExpanded} />
        </Trigger>
        <FieldDetails
          name={`${onInputType}${isRequired ? '*' : ''}`}
          description={inputType.description || null}
          typeName={inputType.name}
          variant="INPUT_TYPE"
          isSelected={!!selection}
        />
      </TriggerWrap>
      <Content>
        {isExpanded && (
          <InputTypeChildArguments>
            {Object.keys(fields).map((a) => {
              return (
                <Argument
                  key={a}
                  ancestors={ancestors}
                  arg={fields[a]}
                  onFieldName={onFieldName}
                  selection={getChildSelection({ arg: fields[a], selection })}
                />
              );
            })}
          </InputTypeChildArguments>
        )}
      </Content>
    </Root>
  );
};
