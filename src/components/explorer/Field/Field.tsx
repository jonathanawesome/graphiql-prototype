import { useEffect, useState } from 'react';

import {
  FieldNode,
  GraphQLField,
  SelectionSetNode,
  isObjectType,
  Kind,
  VariableDefinitionNode,
} from 'graphql';

/** components */
import { FieldDetails, IndicatorField } from '@/components';
import { Arguments } from '../Arguments';

/** hooks */
import { useOperation } from '@/hooks';

/** styles */
import { ChildFields, Content, IndicatorWrap, Trigger, Root } from './styles';

/** types */
import { EditFieldAction, OnEditSignature } from '@/types';

/** utils */
import {
  // buildArgumentNode,
  // buildVariableDefinitionNode,
  // capitalize,
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

  const { operationDefinition } = useOperation();

  const fields = getTypeFields({ type: field.type });

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
    console.log('running handleToggleChildField', { input });

    if (!fieldSelection) {
      return null;
    }

    // let newVariableDefinition: VariableDefinitionNode | null = null;

    // if (input.type === 'updateField') {
    //   //TODO 👇 this is overwriting existing variable definitions
    //   // if input.payloads.newVariableDefinition.variable.name.value already exists in the variableDefinitions, skip it
    //   if (operationDefinition?.variableDefinitions?.find(vD => vD.variable.name ===  input.payloads.newVariableDefinition?.variable.name) {

    //     newVariableDefinition = input.payloads.newVariableDefinition;
    //   }
    // }

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
        payloads: {
          field: { ...fieldSelection, selectionSet },
          newVariableDefinition: null,
          variableNameToRemove: null,
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
    <Root offset={!isObjectType(parent)} open={isExpanded} onOpenChange={setIsExpanded}>
      <Trigger
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
        <IndicatorWrap isActive={!!fieldSelection}>
          <IndicatorField active={!!fieldSelection} />
        </IndicatorWrap>
        <FieldDetails
          fieldOrArg={field}
          isCollapsible={!!fields}
          isCollapsed={!isExpanded}
          isSelected={!!fieldSelection}
        />
      </Trigger>
      <Content>
        <Arguments
          args={[...field.args]}
          onEdit={onEdit}
          onFieldName={field.name}
          onFieldSelection={fieldSelection}
        />
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
      </Content>
    </Root>
  );
};
