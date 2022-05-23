import { useState } from 'react';

import { FieldNode, GraphQLArgument, isRequiredArgument } from 'graphql';

/** components */
import { Argument, ShowArguments } from '@/components';

/** styles */
import { Root, Content, Trigger } from './styles';

/** types */
import { OnEditSignature } from '@/types';

/** utils */
import {
  buildArgumentNode,
  buildVariableNameValue,
  buildNewVariableDefinition,
  generateAndSetEasyVariable,
  unwrapInputType,
  capitalize,
} from '@/utils';

type ArgumentsProps = {
  args: GraphQLArgument[];
  onEdit: OnEditSignature;
  onFieldName: string;
  onFieldSelection: FieldNode | null;
};

export const Arguments = ({
  args,
  onEdit,
  onFieldName,
  onFieldSelection,
}: ArgumentsProps) => {
  console.log('rendering Arguments', {
    args,
    onFieldSelection,
    'onFieldSelection.arguments': onFieldSelection?.arguments,
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TODO: this is gross
  const requiredArgs = args.filter((a) => isRequiredArgument(a));
  const optionalArgs = args.filter((a) => !isRequiredArgument(a));

  const addArg = ({ argToAdd }: { argToAdd: GraphQLArgument }) => {
    const newArgumentNode = buildArgumentNode({
      argumentName: argToAdd.name,
      variableName: `${onFieldName}${capitalize({ string: argToAdd.name })}`,
    });

    const newArgs = [...(onFieldSelection?.arguments || []), newArgumentNode];

    const newFieldNode: FieldNode = {
      ...(onFieldSelection as FieldNode),
      arguments: newArgs,
    };

    generateAndSetEasyVariable({
      variableName: buildVariableNameValue({
        fieldName: onFieldName,
        parentArgName: null,
        argName: argToAdd.name,
      }),
      unwrappedType: unwrapInputType({ inputType: argToAdd.type }),
    });

    // console.log('addArg', {
    //   forArg: argToAdd,
    //   parentArgName: argToAdd.name,
    //   selectionName: onFieldName,
    //   // newVariableDefinition: buildNewVariableDefinition({
    //   //   fieldName: onFieldName,
    //   //   parentArgName: null,
    //   //   forArg: argToAdd,
    //   // }),
    //   field: newFieldNode,
    // });

    return onEdit({
      input: {
        type: 'updateField',
        payloads: {
          field: newFieldNode,
          variableNameToRemove: null,
          newVariableDefinition: buildNewVariableDefinition({
            fieldName: onFieldName,
            parentArgName: null,
            forArg: argToAdd,
          }),
        },
      },
    });
  };

  const removeArg = ({ argToRemove }: { argToRemove: GraphQLArgument }) => {
    // console.log('removeArg', { argToRemove, field });

    const newArgs = onFieldSelection?.arguments?.filter(
      (a) => a.name.value !== argToRemove.name
    );

    const newFieldNode: FieldNode = {
      ...(onFieldSelection as FieldNode),
      arguments: newArgs,
    };

    return onEdit({
      input: {
        type: 'updateField',
        payloads: {
          field: newFieldNode,
          variableNameToRemove: `${onFieldSelection?.name.value}${capitalize({
            string: argToRemove.name,
          })}`,
          newVariableDefinition: null,
        },
      },
    });
  };

  return (
    <Root open={isOpen} onOpenChange={setIsOpen}>
      {requiredArgs.length > 0
        ? requiredArgs
            .sort()
            .map((arg) => (
              <Argument
                key={arg.name}
                addArg={addArg}
                arg={arg}
                onInputTypeArg={null}
                removeArg={removeArg}
                selection={onFieldSelection}
                onEdit={onEdit}
              />
            ))
        : null}
      {optionalArgs.length > 0 && (
        <>
          <Trigger>
            <ShowArguments
              isArgsExpanded={isOpen}
              optionalArgsCount={optionalArgs.length}
              requiredArgsCount={requiredArgs.length}
            />
          </Trigger>

          <Content>
            {optionalArgs.length > 0
              ? optionalArgs
                  .sort()
                  .map((arg) => (
                    <Argument
                      key={arg.name}
                      addArg={addArg}
                      arg={arg}
                      onInputTypeArg={null}
                      removeArg={removeArg}
                      selection={onFieldSelection}
                      onEdit={onEdit}
                    />
                  ))
              : null}
          </Content>
        </>
      )}
    </Root>
  );
};