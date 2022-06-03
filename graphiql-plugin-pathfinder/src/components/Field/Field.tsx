import { useState } from 'react';

import { FieldNode, InlineFragmentNode, isObjectType, isUnionType } from 'graphql';

/** components */
import {
  Arguments,
  Caret,
  FieldDetails,
  IndicatorField,
  ObjectType,
  UnionType,
} from '../index';

/** hooks */
import type { AncestorField, AncestorMap } from '../../hooks';
import { usePathfinder } from '../../hooks';

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
import { findSelection, getTypeFields, unwrapType } from '../../utils';

const toggle = usePathfinder.getState().toggle;

export const Field = ({ ancestors }: { ancestors: AncestorMap }) => {
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

  // console.log('rendering Field', {
  //   field,
  //   selection,
  //   selectionSet,
  // });

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
        <IndicatorWrap
          isActive={!!selection}
          onClick={() => {
            if (!selection && !isExpanded) {
              setIsExpanded(true);
            }
            if (!!selection && isExpanded) {
              setIsExpanded(false);
            }
            return toggle({ ancestors });
          }}
        >
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
