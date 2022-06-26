import {
  // useEffect,
  useState,
} from 'react';

import {
  FieldNode,
  InlineFragmentNode,
  isInterfaceType,
  isObjectType,
  isUnionType,
  OperationTypeNode,
} from 'graphql';

// components
import { Arguments, Collapser, ItemGrid, ObjectType, UnionType } from '../index';
import { IndicatorField } from '../../icons';
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';

// hooks
import type { AncestorField, AncestorMap } from '../../hooks';
import { useDocs } from '@graphiql-v2-prototype/graphiql-plugin-pane-docs';
import { usePathfinder } from '../../hooks';

// styles
import { FieldChildren, IndicatorWrap } from './styles';

// utils
import { findSelection, unwrapType } from '../../utils';

const toggle = usePathfinder.getState().toggle;

export const Field = ({
  ancestors,
  operationType,
}: {
  ancestors: AncestorMap;
  operationType: OperationTypeNode;
}) => {
  const { descriptionsVisibility, fieldsVisibility } = usePathfinder();
  const { currentType, previousTypes, setCurrentType, setPreviousTypes } = useDocs();

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
        operationType={operationType}
        selection={selection}
      />
    );
  } else if (isObjectType(unwrappedType)) {
    childFieldsToRender = (
      <ObjectType
        ancestors={ancestors}
        fields={unwrappedType.getFields()}
        operationType={operationType}
        selection={selection}
      />
    );
  } else if (isUnionType(unwrappedType)) {
    childFieldsToRender = (
      <UnionType
        ancestors={ancestors}
        operationType={operationType}
        selection={selection}
        unionType={unwrappedType}
      />
    );
  }

  if (fieldsVisibility === 'On' && !selection) {
    return null;
  }

  if (!isCollapsible) {
    return (
      <ItemGrid>
        <IndicatorWrap
          isActive={!!selection}
          onClick={() => toggle({ ancestors, operationType })}
        >
          <IndicatorField />
        </IndicatorWrap>
        <DescriptionListItem
          descriptionPlacement={descriptionsVisibility}
          description={field.description || null}
          isSelected={!!selection}
          name={field.name}
          type={
            <button
              onClick={() => {
                setCurrentType({
                  currentType: field.type,
                });
                setPreviousTypes({
                  previousTypes: currentType ? [...previousTypes, currentType] : [],
                });
              }}
            >
              {field.type.toString()}
            </button>
          }
          entityType="FIELD"
        />
      </ItemGrid>
    );
  } else {
    return (
      <Collapser
        content={
          <FieldChildren>
            {field.args.length > 0 && (
              <Arguments
                ancestors={ancestors}
                operationType={operationType}
                selection={selection as FieldNode}
              />
            )}
            <>{childFieldsToRender}</>
          </FieldChildren>
        }
        leadContent={
          <DescriptionListItem
            description={field.description || null}
            descriptionPlacement={descriptionsVisibility}
            isSelected={!!selection}
            name={field.name}
            type={
              <button
                onClick={() => {
                  setCurrentType({
                    currentType: field.type,
                  });
                  setPreviousTypes({
                    previousTypes: currentType ? [...previousTypes, currentType] : [],
                  });
                }}
              >
                {field.type.toString()}
              </button>
            }
            entityType="FIELD"
          />
        }
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        toggler={
          <IndicatorWrap
            isActive={!!selection}
            onClick={() => {
              if (!selection && !isExpanded) {
                setIsExpanded(true);
              }
              if (!!selection && isExpanded) {
                setIsExpanded(false);
              }
              return toggle({ ancestors, operationType });
            }}
          >
            <IndicatorField />
          </IndicatorWrap>
        }
      />
    );
  }
};
