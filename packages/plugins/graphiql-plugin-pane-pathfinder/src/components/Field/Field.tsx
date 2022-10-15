import {
  FieldNode,
  InlineFragmentNode,
  isInterfaceType,
  isObjectType,
  isUnionType,
  Kind,
  OperationTypeNode,
  // print,
} from 'graphql';

// components
import { Arguments, Fields, ListItem, Union } from '../index';

// hooks
import {
  AncestorField,
  // AncestorMap,
  AncestorsArray,
  // usePathfinder
} from '../../hooks';

// utils
import { findSelection, unwrapType } from '../../utils';

export const Field = ({
  // operationType,
  ancestors,
}: {
  // ancestors: AncestorMap;
  ancestors: AncestorsArray;
  // operationType: OperationTypeNode;
}) => {
  // const { fieldsVisibility } = usePathfinder();

  // const { field, selectionSet } = ancestors.values().next().value as AncestorField;
  const { field, selection } = ancestors[ancestors.length - 1] as AncestorField;

  // console.log('rendering Field', {
  //   ancestors,
  //   name: field.name,
  //   selection,
  //   selections: selection ? (selection as FieldNode).selectionSet?.selections : null,
  // });

  // const ancestorsToPass: AncestorsArray = [
  //   {
  //     field:,
  //     // selectionSet,
  //     selection:
  //       operationDefinition?.selectionSet?.selections.find(
  //         (s) => (s as FieldNode).name.value === fields[field].name
  //       ) || null,
  //   },
  // ];

  const unwrappedType = unwrapType(field.type);

  const isCollapsible =
    isObjectType(unwrappedType) ||
    isUnionType(unwrappedType) ||
    isInterfaceType(unwrappedType) ||
    field.args.length > 0;

  // let selection: FieldNode | InlineFragmentNode | undefined = undefined;

  // if (selectionSet && selectionSet.selections) {
  //   selection = findSelection({
  //     fieldName: field.name,
  //     selections: [...selectionSet.selections],
  //   });
  // }

  const parentSelections = () => {
    if (selection && 'selectionSet' in selection && selection.selectionSet) {
      return selection.selectionSet.selections;
    }
    return [];
  };

  // const ancestorValues = ancestors.values();

  let childFieldsToRender: React.ReactNode = null;

  if (isObjectType(unwrappedType) || isInterfaceType(unwrappedType)) {
    const fields = unwrappedType.getFields();
    childFieldsToRender = fields && (
      <Fields
        ancestors={ancestors}
        fields={unwrappedType.getFields()}
        // operationType={operationType}
        parentSelections={parentSelections()}
      />
    );
  } else if (isUnionType(unwrappedType)) {
    childFieldsToRender = (
      <Union
        ancestors={ancestors}
        // operationType={operationType}
        // selection={selection}
        parentSelections={parentSelections()}
        unionType={unwrappedType}
      />
    );
  }

  // if (fieldsVisibility === 'On' && !selection) {
  //   return null;
  // }

  return (
    <ListItem
      collapsibleContent={
        isCollapsible
          ? {
              arguments: field.args.length > 0 && (
                <Arguments
                  ancestors={ancestors}
                  // operationType={operationType}
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
        // fieldOrArgumentName: field.name,
        isSelected: !!selection,
        // operationType,
        variant: 'FIELD',
      }}
      type={field}
      variant="FIELD"
    />
  );
};
