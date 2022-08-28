import {
  FieldNode,
  InlineFragmentNode,
  isInterfaceType,
  isObjectType,
  isUnionType,
  OperationTypeNode,
} from 'graphql';

// components
import { Arguments, Fields, ListItem, Union } from '../index';

// hooks
import { AncestorField, AncestorMap, usePathfinder } from '../../hooks';

// utils
import { findSelection, unwrapType } from '../../utils';

export const Field = ({
  ancestors,
  operationType,
}: {
  ancestors: AncestorMap;
  operationType: OperationTypeNode;
}) => {
  const { fieldsVisibility } = usePathfinder();

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

  // console.log('rendering Field', {
  //   field,
  //   args: field.args,
  // });

  let childFieldsToRender: React.ReactNode = null;

  if (isObjectType(unwrappedType) || isInterfaceType(unwrappedType)) {
    const fields = unwrappedType.getFields();
    childFieldsToRender = fields && (
      <Fields
        ancestors={ancestors}
        fields={unwrappedType.getFields()}
        operationType={operationType}
        selection={selection}
      />
    );
  } else if (isUnionType(unwrappedType)) {
    childFieldsToRender = (
      <Union
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

  return (
    <ListItem
      collapsibleContent={
        isCollapsible
          ? {
              arguments: field.args.length > 0 && (
                <Arguments
                  ancestors={ancestors}
                  operationType={operationType}
                  selection={selection as FieldNode}
                />
              ),
              childFields: childFieldsToRender,
            }
          : undefined
      }
      isSelected={!!selection}
      toggler={{
        ancestors,
        fieldOrArgumentName: field.name,
        isSelected: !!selection,
        operationType,
        variant: 'FIELD',
      }}
      type={field}
      variant="FIELD"
    />
  );
};
