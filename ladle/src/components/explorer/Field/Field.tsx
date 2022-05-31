import {
  // useEffect,
  useState,
} from 'react';

// import cuid from 'cuid';

import {
  FieldNode,
  // GraphQLFieldMap,
  // GraphQLObjectType,
  InlineFragmentNode,
  isObjectType,
  isUnionType,
  // isWrappingType,
  // SelectionNode,
} from 'graphql';

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
  // const hash = cuid();
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
  //   // hash,
  //   field,
  //   selection,
  //   selectionSet,
  //   // ancestors,
  //   // unwrappedType: unwrapType(field.type),
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
      {/* <p style={{ fontSize: '8px' }}>{hash}</p> */}
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
          <Arguments
            ancestors={ancestors}
            onFieldSelection={selection as FieldNode}
            onFieldName={field.name}
          />
        )}
        <ChildFields>{childFieldsToRender}</ChildFields>
      </Content>
    </Root>
  );
};
