import { useState } from 'react';

import { FieldNode, isObjectType } from 'graphql';

/** components */
import { FieldDetails, IndicatorField } from '@/components';
import { Arguments } from '../Arguments';

/** styles */
import {
  ChildFields,
  Content,
  IndicatorWrap,
  Trigger,
  TriggerWrap,
  Root,
} from './styles';

/** utils */
import { getTypeFields } from '@/utils';
import { AncestorField, AncestorMap, toggleField } from './toggleField';
import { Caret, IndicatorInputType } from '../../icons';

type FieldProps = {
  ancestors: AncestorMap;
};

export const Field = ({ ancestors }: FieldProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { field, selectionSet } = ancestors.values().next().value as AncestorField;

  const childFields = getTypeFields({ type: field.type });

  const fieldSelection = (selectionSet?.selections as FieldNode[])?.find(
    (selection) => selection.name.value === field.name
  );

  // console.log('rendering Field', { fieldName: field.name, selectionSet, fieldSelection });

  return (
    <Root offset={!isObjectType(parent)} open={isExpanded} onOpenChange={setIsExpanded}>
      <TriggerWrap isCollapsible={!!childFields}>
        <IndicatorWrap
          isActive={!!fieldSelection}
          onClick={() => toggleField({ ancestors })}
        >
          <IndicatorField active={!!fieldSelection} />
        </IndicatorWrap>
        {!!childFields && (
          <Trigger>
            {'args' in field ? (
              <Caret isExpanded={isExpanded} />
            ) : (
              <IndicatorInputType isExpanded={isExpanded} isSelected={!!fieldSelection} />
            )}
          </Trigger>
        )}
        <FieldDetails
          fieldOrArg={field}
          // isCollapsible={!!childFields}
          // isCollapsed={!isExpanded}
          isSelected={!!fieldSelection}
        />
      </TriggerWrap>

      <Content>
        <Arguments
          args={[...field.args]}
          // onEdit={onEdit}
          onFieldName={field.name}
          // onFieldSelection={fieldSelection}
        />
        {!childFields ? null : (
          <ChildFields>
            {Object.keys(childFields).map((f) => (
              <Field
                key={childFields[f].name}
                ancestors={
                  new Map([
                    [
                      `${childFields[f].name}`,
                      {
                        field: childFields[f],
                        selectionSet: fieldSelection?.selectionSet,
                        selection: fieldSelection?.selectionSet?.selections.find(
                          (selection) =>
                            (selection as FieldNode).name.value === childFields[f].name
                        ),
                      },
                    ],
                    ...ancestors,
                  ])
                }
              />
            ))}
          </ChildFields>
        )}
      </Content>
    </Root>
  );
};
