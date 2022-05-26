import { useEffect, useState } from 'react';

import cuid from 'cuid';

import { FieldNode, GraphQLFieldMap, isObjectType } from 'graphql';

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
  const hash = cuid();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { field, selectionSet } = ancestors.values().next().value as AncestorField;

  const childFields = getTypeFields({ type: field.type });
  // if (isUnionType(type)) {
  //   // do something here with unions
  // }

  const fieldSelection = (selectionSet?.selections as FieldNode[])?.find(
    (selection) => selection.name.value === field.name
  );

  console.log('rendering Field', {
    fieldName: field.name,
    hash,
    ancestors,
    childFields,
  });

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
        <FieldDetails fieldOrArg={field} isSelected={!!fieldSelection} />
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
            {Object.keys(childFields).map((f) => {
              return (
                <Field
                  key={childFields[f].name}
                  // we hash the key here to prevent the spread from overwriting deeply nested fields with the same key
                  ancestors={
                    new Map([
                      [
                        `${childFields[f].name}-${hash}`,
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
              );
            })}
          </ChildFields>
        )}
      </Content>
    </Root>
  );
};
