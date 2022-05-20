import { useState } from 'react';

import { FieldNode, GraphQLArgument, isRequiredArgument } from 'graphql';

/** components */
import { Argument, ShowArguments } from '@/components';

/** styles */
import { Root, Content, Trigger } from './styles';

/** types */
import { OnEditSignature } from '@/types';

/** utils */
import { buildArgumentNode, buildNewVariableDefinition, capitalize } from '@/utils';

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
  // console.log('rendering Arguments', {
  //   args,
  // });

  const [isOpen, setIsOpen] = useState<boolean>(false);

  // TODO: this is gross
  const requiredArgs = args.filter((a) => isRequiredArgument(a));
  const optionalArgs = args.filter((a) => !isRequiredArgument(a));

  const addArg = ({ argToAdd }: { argToAdd: GraphQLArgument }) => {
    // console.log('addArg', {
    //   forArg: argToAdd,
    //   parentArgName: argToAdd.name,
    //   selectionName: onFieldName,
    // });

    const newArg = buildArgumentNode({
      argumentName: argToAdd.name,
      variableName: `${onFieldName}${capitalize({ string: argToAdd.name })}`,
    });

    const newArgs = [...(onFieldSelection?.arguments || []), newArg];

    const newFieldNode: FieldNode = {
      ...(onFieldSelection as FieldNode),
      arguments: newArgs,
    };

    return onEdit({
      input: {
        type: 'updateField',
        payloads: {
          field: newFieldNode,
          newVariableDefinition: buildNewVariableDefinition({
            fieldName: onFieldName,
            parentArgName: null,
            forArg: argToAdd,
          }),
          variableNameToRemove: null,
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
