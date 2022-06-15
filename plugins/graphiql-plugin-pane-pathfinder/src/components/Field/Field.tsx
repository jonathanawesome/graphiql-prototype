import { useEffect, useState } from 'react';

import {
  FieldNode,
  InlineFragmentNode,
  isInterfaceType,
  isObjectType,
  isUnionType,
} from 'graphql';

/** components */
import {
  Arguments,
  Collapser,
  Describe,
  IndicatorField,
  ItemGrid,
  ObjectType,
  UnionType,
} from '../index';

/** hooks */
import type { AncestorField, AncestorMap } from '../../hooks';
import { usePathfinder } from '../../hooks';

/** styles */
import { FieldChildren, IndicatorWrap } from './styles';

/** utils */
import { findSelection, unwrapType } from '../../utils';

const toggle = usePathfinder.getState().toggle;

export const Field = ({ ancestors }: { ancestors: AncestorMap }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { field, selectionSet } = ancestors.values().next().value as AncestorField;

  const unwrappedType = unwrapType(field.type);

  const isCollapsible =
    isObjectType(unwrappedType) ||
    isUnionType(unwrappedType) ||
    isInterfaceType(unwrappedType) ||
    field.args.length > 0;

  let selection: FieldNode | InlineFragmentNode | undefined = undefined;

  if (selectionSet && selectionSet.selections) {
    selection = findSelection({
      fieldName: field.name,
      selections: [...selectionSet.selections],
    });
  }

  // useEffect(() => {
  //   setIsExpanded(!!selection);
  // }, [selection]);

  // console.log('rendering Field', {
  //   field,
  //   args: field.args,
  // });

  let childFieldsToRender: React.ReactNode = null;

  if (isInterfaceType(unwrappedType)) {
    childFieldsToRender = (
      <ObjectType
        ancestors={ancestors}
        fields={unwrappedType.getFields()}
        selection={selection}
      />
    );
  } else if (isObjectType(unwrappedType)) {
    childFieldsToRender = (
      <ObjectType
        ancestors={ancestors}
        fields={unwrappedType.getFields()}
        selection={selection}
      />
    );
  } else if (isUnionType(unwrappedType)) {
    childFieldsToRender = (
      <UnionType ancestors={ancestors} unionType={unwrappedType} selection={selection} />
    );
  }

  if (!isCollapsible) {
    return (
      <ItemGrid>
        <IndicatorWrap isActive={!!selection} onClick={() => toggle({ ancestors })}>
          <IndicatorField active={!!selection} />
        </IndicatorWrap>
        <Describe
          name={field.name}
          description={field.description || null}
          isSelected={!!selection}
          type={field.type}
          variant="FIELD"
        />
      </ItemGrid>
    );
  } else {
    return (
      <Collapser
        content={
          <FieldChildren>
            {field.args.length > 0 && (
              <Arguments ancestors={ancestors} selection={selection as FieldNode} />
            )}
            <>{childFieldsToRender}</>
          </FieldChildren>
        }
        leadContent={
          <Describe
            name={field.name}
            description={field.description || null}
            isSelected={!!selection}
            type={field.type}
            variant="FIELD"
          />
        }
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        toggler={
          <IndicatorWrap
            isActive={!!selection}
            onClick={() => {
              // if (!selection && !isExpanded) {
              //   setIsExpanded(true);
              // }
              // if (!!selection && isExpanded) {
              //   setIsExpanded(false);
              // }
              return toggle({ ancestors });
            }}
          >
            <IndicatorField active={!!selection} />
          </IndicatorWrap>
        }
      />
    );
  }
};
