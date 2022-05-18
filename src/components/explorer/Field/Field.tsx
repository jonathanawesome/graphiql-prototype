import { useEffect, useState } from 'react';

import {
  FieldNode,
  GraphQLField,
  SelectionSetNode,
  isObjectType,
  Kind,
  GraphQLArgument,
  isRequiredArgument,
} from 'graphql';

/** components */
import {
  Root as CollapsibleRoot,
  Trigger as CollapsibleTrigger,
  Content as CollapsibleContent,
} from '@radix-ui/react-collapsible';
import { Argument, FieldDetails, IndicatorField, ShowArguments } from '@/components';

/** styles */
import {
  ChildFields,
  ArgsContainer,
  FieldCollapsibleTriggerWrap,
  FieldWrap,
  FieldTogglerButton,
  RequiredArgs,
  OptionalArgs,
} from './styles';

/** types */
import { EditFieldAction, OnEditSignature } from '@/types';

/** utils */
import {
  buildArgumentNode,
  buildVariableDefinitionNode,
  capitalize,
  editFieldSelection,
  getTypeFields,
} from '@/utils';

type FieldProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
  selectionSet: SelectionSetNode | undefined;
  onEdit: OnEditSignature;
};

export const Field = ({ field, selectionSet, onEdit }: FieldProps) => {
  const [fieldSelection, setFieldSelection] = useState<FieldNode | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isArgsExpanded, setIsArgsExpanded] = useState<boolean>(false);

  const fields = getTypeFields({ type: field.type });
  const fieldArgs = [...field.args];

  // TODO: this is gross
  const requiredArgs = fieldArgs.filter((a) => isRequiredArgument(a));
  const optionalArgs = fieldArgs.filter((a) => !isRequiredArgument(a));

  useEffect(() => {
    const fieldSelection = (selectionSet?.selections as FieldNode[])?.find(
      (item) => item.name.value === field.name
    );

    if (fieldSelection) {
      setFieldSelection(fieldSelection);
      setIsExpanded(true);
    } else {
      setFieldSelection(null);
      setIsExpanded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionSet]);

  const handleToggleChildField = ({ input }: { input: EditFieldAction }) => {
    // console.log('running handleToggleChildField', { input });

    if (!fieldSelection) {
      return null;
    }

    const selectionSet: SelectionSetNode = (() => {
      const set: SelectionSetNode = fieldSelection.selectionSet
        ? fieldSelection.selectionSet
        : {
            kind: Kind.SELECTION_SET,
            selections: [],
          };

      set.selections = editFieldSelection({ original: set.selections, action: input });

      return set;
    })();

    return onEdit({
      input: {
        type: 'updateField',
        payloads: { field: { ...fieldSelection, selectionSet } },
      },
    });
  };

  const addArg = ({ argToAdd }: { argToAdd: GraphQLArgument }) => {
    // console.log('addArg', { argToAdd, field });

    const newArg = buildArgumentNode({
      argumentName: argToAdd.name,
      variableName: `${field.name}${capitalize({ string: argToAdd.name })}`,
    });

    const newArgs = [...(fieldSelection?.arguments || []), newArg];

    // console.log({ newArgs });

    const newFieldNode: FieldNode = {
      ...(fieldSelection as FieldNode),
      arguments: newArgs,
    };

    return onEdit({
      input: {
        type: 'updateField',
        payloads: {
          field: newFieldNode,
          variableDefinitionToAdd: buildVariableDefinitionNode({
            variableName: `${field.name}${capitalize({ string: argToAdd.name })}`,
            variableType: argToAdd.type.toString(),
          }),
        },
      },
    });
  };

  const removeArg = ({ argToRemove }: { argToRemove: GraphQLArgument }) => {
    // console.log('removeArg', { argToRemove, field });

    const newArgs = fieldSelection?.arguments?.filter(
      (a) => a.name.value !== argToRemove.name
    );
    // console.log({ newArgs });

    const newFieldNode: FieldNode = {
      ...(fieldSelection as FieldNode),
      arguments: newArgs,
    };

    return onEdit({
      input: {
        type: 'updateField',
        payloads: {
          field: newFieldNode,
          variableNameToRemove: `${fieldSelection?.name.value}${capitalize({
            string: argToRemove.name,
          })}`,
        },
      },
    });
  };

  // console.log('rendering Field', {
  //   fieldName: field.name,
  //   field,
  //   fieldSelection,
  // });

  return (
    <FieldWrap offset={!isObjectType(parent)}>
      <CollapsibleRoot open={isExpanded} onOpenChange={setIsExpanded}>
        <FieldCollapsibleTriggerWrap>
          <FieldTogglerButton
            active={!!fieldSelection}
            onClick={() => {
              const shouldAdd = !fieldSelection;
              // console.log({ onEdit, shouldAdd });

              if (!shouldAdd && !isExpanded) {
                setIsExpanded(false);
              }

              if (shouldAdd && !isExpanded) {
                setIsExpanded(true);
              }

              if (!shouldAdd && isExpanded) {
                setIsExpanded(false);
              }

              if (shouldAdd && isExpanded) {
                setIsExpanded(true);
              }

              shouldAdd
                ? onEdit({ input: { type: 'addField', payloads: field } })
                : onEdit({
                    input: { type: 'removeField', payloads: { name: field.name } },
                  });
            }}
          >
            <IndicatorField active={!!fieldSelection} />
          </FieldTogglerButton>
          <CollapsibleTrigger>
            <FieldDetails
              fieldOrArg={field}
              isCollapsible={!!fields}
              isCollapsed={!isExpanded}
              isSelected={!!fieldSelection}
            />
          </CollapsibleTrigger>
        </FieldCollapsibleTriggerWrap>
        <ArgsContainer>
          {/* // TODO: in-progress */}
          {/* <SelectedArgs>
            {selectedArguments.length > 0
              ? selectedArguments
                  .sort()
                  .map((arg) => (
                    <Argument
                      key={arg.name}
                      addArg={addArg}
                      arg={arg}
                      onInputTypeArg={null}
                      removeArg={removeArg}
                      selection={fieldSelection}
                      onEdit={onEdit}
                    />
                  ))
              : null}
          </SelectedArgs> */}
          <CollapsibleContent>
            {fieldArgs.length > 0 && (
              <CollapsibleRoot open={isArgsExpanded} onOpenChange={setIsArgsExpanded}>
                <RequiredArgs>
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
                            selection={fieldSelection}
                            onEdit={onEdit}
                          />
                        ))
                    : null}
                </RequiredArgs>
                {optionalArgs.length > 0 && (
                  <>
                    <CollapsibleTrigger>
                      <ShowArguments
                        isArgsExpanded={isArgsExpanded}
                        optionalArgsCount={optionalArgs.length}
                        requiredArgsCount={requiredArgs.length}
                      />
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <OptionalArgs>
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
                                  selection={fieldSelection}
                                  onEdit={onEdit}
                                />
                              ))
                          : null}
                      </OptionalArgs>
                    </CollapsibleContent>
                  </>
                )}
              </CollapsibleRoot>
            )}

            {!fields ? null : (
              <ChildFields>
                {Object.keys(fields).map((f) => (
                  <Field
                    key={fields[f].name}
                    field={fields[f]}
                    selectionSet={fieldSelection?.selectionSet}
                    onEdit={handleToggleChildField}
                  />
                ))}
              </ChildFields>
            )}
          </CollapsibleContent>
        </ArgsContainer>
      </CollapsibleRoot>
    </FieldWrap>
  );
};
