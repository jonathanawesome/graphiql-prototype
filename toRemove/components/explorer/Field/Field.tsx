import { useState } from 'react';

import { FieldNode, InlineFragmentNode, isObjectType, isUnionType } from 'graphql';

/** components */
import { FieldDetails, IndicatorField } from '@/components';
import { Arguments } from '../Arguments';
import { Caret } from '../../icons';
import { ObjectType } from '../ObjectType';
import { UnionType } from '../UnionType';

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
import { findSelection, getTypeFields, unwrapType } from '@/utils';
import { AncestorField, AncestorMap, useToggler } from '@/hooks';

type FieldProps = {
  ancestors: AncestorMap;
};

const toggle = useToggler.getState().toggle;

export const Field = ({ ancestors }: FieldProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { field, selectionSet } = ancestors.values().next().value as AncestorField;

  const unwrappedType = unwrapType(field.type);

  const isCollapsible = isObjectType(unwrappedType) || isUnionType(unwrappedType);

  let selection: FieldNode | InlineFragmentNode | undefined = undefined;

  if (selectionSet && selectionSet.selections) {
    selection = findSelection({
      fieldName: field.name,
      selections: [...selectionSet.selections],
    });
  }

  console.log('rendering Field', {
    field,
    selection,
    selectionSet,
  });

  let childFieldsToRender: React.ReactNode = null;

  if (isObjectType(unwrappedType)) {
    childFieldsToRender = (
      <ObjectType
        ancestors={ancestors}
        fields={getTypeFields({ type: unwrappedType })}
        parentType="FIELD"
        selection={selection}
      />
    );
  } else if (isUnionType(unwrappedType)) {
    childFieldsToRender = (
      <UnionType ancestors={ancestors} unionType={unwrappedType} selection={selection} />
    );
  }

  return (
    <Root offset={!isObjectType(parent)} open={isExpanded} onOpenChange={setIsExpanded}>
      <TriggerWrap isCollapsible={isCollapsible}>
        <IndicatorWrap isActive={!!selection} onClick={() => toggle({ ancestors })}>
          <IndicatorField active={!!selection} />
        </IndicatorWrap>
        {isCollapsible && (
          <Trigger>
            <Caret isExpanded={isExpanded} />
          </Trigger>
        )}
        <FieldDetails
          name={field.name}
          description={field.description || null}
          isSelected={!!selection}
          typeName={field.type.toString()}
          variant="FIELD"
        />
      </TriggerWrap>
      <Content>
        {field.args.length > 0 && (
          <Arguments ancestors={ancestors} selection={selection as FieldNode} />
        )}
        <ChildFields>{childFieldsToRender}</ChildFields>
      </Content>
    </Root>
  );
};
