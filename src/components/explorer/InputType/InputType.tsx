import { useEffect, useState } from 'react';

import {
  ArgumentNode,
  FieldNode,
  GraphQLArgument,
  GraphQLInputFieldMap,
  Kind,
  ObjectFieldNode,
  ObjectValueNode,
} from 'graphql';

/** components */
import { Argument, FieldDetails } from '@/components';

/** styles */
import { Content, Root, Trigger, InputTypeChildArguments } from './styles';

/** types */
import { OnEditSignature } from '@/types';

/* utils */
import { buildNewVariableDefinition, capitalize } from '@/utils';

export const InputType = ({
  inputTypeArg,
  fields,
  onEdit,
  selection,
}: {
  inputTypeArg: GraphQLArgument;
  fields: GraphQLInputFieldMap;
  onEdit: OnEditSignature;
  selection: FieldNode | null;
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const argSelection =
    selection?.arguments?.find((a) => a.name.value === inputTypeArg.name) || null;

  useEffect(() => {
    if (argSelection) {
      setIsExpanded(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('InputObject', {
    inputTypeArg,
    fields,
    // arg,
    selection,
  });

  const addNestedArg = ({ argToAdd }: { argToAdd: GraphQLArgument }) => {
    const ourNewObjectField: ObjectFieldNode = {
      kind: Kind.OBJECT_FIELD,
      name: {
        kind: Kind.NAME,
        value: argToAdd.name,
      },
      value: {
        kind: Kind.VARIABLE,
        name: {
          kind: Kind.NAME,
          value: `${selection?.name.value}${capitalize({
            string: inputTypeArg.name,
          })}${capitalize({ string: argToAdd.name })}`,
        },
      },
    };

    let newArg: ArgumentNode | null = null;
    let newArguments: ArgumentNode[] | null = null;

    if (argSelection) {
      newArg = {
        ...argSelection,
        value: {
          kind: Kind.OBJECT,
          fields: [...(argSelection.value as ObjectValueNode).fields, ourNewObjectField],
        },
      };

      newArguments = [
        ...(selection?.arguments?.filter((a) => a.name.value !== inputTypeArg.name) ||
          []),
        newArg,
      ];
    } else {
      newArg = {
        kind: Kind.ARGUMENT,
        name: { kind: Kind.NAME, value: inputTypeArg.name },
        value: {
          kind: Kind.OBJECT,
          fields: [ourNewObjectField],
        },
      };
      newArguments = [...(selection?.arguments || []), newArg];
    }

    //TODO 👆 newarguments is wrong here when there's an existing arg selection
    console.log('i want to add this NESTED arg', {
      argToAdd,
      // fields,
      inputTypeArg,
      argSelection,
      selection,
      newArguments: [
        ...(selection?.arguments?.filter((a) => a.name.value !== inputTypeArg.name) ||
          []),
        newArg,
      ],
      // newArguments: [...(selection?.arguments || []), newArg],
    });

    const newFieldNode: FieldNode = {
      ...(selection as FieldNode),
      arguments: newArguments,
    };

    return onEdit({
      input: {
        type: 'updateField',
        payloads: {
          field: newFieldNode,
          newVariableDefinition: buildNewVariableDefinition({
            forArg: argToAdd,
            parentArgName: inputTypeArg.name,
            selectionName: selection?.name.value as string,
          }),
          // variableDefinitionToAdd: buildVariableDefinitionNode({
          //   variableName: `${selection?.name.value}${capitalize({
          //     string: inputTypeArg.name,
          //   })}${capitalize({ string: argToAdd.name })}`,
          //   variableType: argToAdd.type.toString(),
          // }),
        },
      },
    });
  };

  const removeNestedArg = ({ argToRemove }: { argToRemove: GraphQLArgument }) => {
    let newArgs: ArgumentNode[] | null = null;

    if ((argSelection?.value as ObjectValueNode).fields.length === 1) {
      newArgs =
        selection?.arguments?.filter((a) => a.name.value !== inputTypeArg.name) || null;
    } else {
      const newInputObjectArgument = (
        argSelection?.value as ObjectValueNode
      ).fields.flatMap((field) => {
        if (field.name.value !== argToRemove.name) {
          return field;
        } else {
          return [];
        }
      });

      const newArg: ArgumentNode = {
        ...(argSelection as ArgumentNode),
        value: {
          kind: Kind.OBJECT,
          fields: newInputObjectArgument,
        },
      };

      newArgs = [
        ...(selection?.arguments?.filter((a) => a.name.value !== inputTypeArg.name) ||
          []),
        newArg,
      ];
    }

    console.log('i want to remove this NESTED arg', {
      argToRemove,
      fields,
      selection,
      newArgs,
    });

    // console.log({ newArgs, origArgs: selection?.arguments });

    const newFieldNode: FieldNode = {
      ...(selection as FieldNode),
      arguments: newArgs || undefined,
    };

    return onEdit({
      input: {
        type: 'updateField',
        payloads: {
          field: newFieldNode,
          variableNameToRemove: `${selection?.name.value}${capitalize({
            string: inputTypeArg.name,
          })}${capitalize({ string: argToRemove.name })}`,
        },
      },
    });
  };

  return (
    <Root open={isExpanded} onOpenChange={setIsExpanded}>
      <Trigger>
        <FieldDetails
          fieldOrArg={inputTypeArg}
          isCollapsible={true}
          isCollapsed={!isExpanded}
          isSelected={!!argSelection}
        />
      </Trigger>

      <Content>
        {isExpanded && (
          <InputTypeChildArguments>
            {Object.keys(fields).map((a) => {
              return (
                <Argument
                  key={a}
                  addArg={addNestedArg}
                  arg={fields[a]}
                  onInputTypeArg={inputTypeArg.name}
                  removeArg={removeNestedArg}
                  selection={selection}
                  onEdit={onEdit}
                />
              );
            })}
          </InputTypeChildArguments>
        )}
      </Content>
    </Root>
  );
};
