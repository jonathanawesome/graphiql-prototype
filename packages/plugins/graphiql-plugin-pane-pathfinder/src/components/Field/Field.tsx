import { FieldNode, isInterfaceType, isObjectType, isUnionType } from 'graphql';

// components
import { Arguments, Fields, ListItem, Union } from '../index';

// hooks
import { AncestorField, AncestorsArray } from '../../hooks';

// utils
import { unwrapType } from '../../utils';

export const Field = ({ ancestors }: { ancestors: AncestorsArray }) => {
  const { field, selection } = ancestors[ancestors.length - 1] as AncestorField;

  const unwrappedType = unwrapType(field.type);

  const isCollapsible =
    isObjectType(unwrappedType) ||
    isUnionType(unwrappedType) ||
    isInterfaceType(unwrappedType) ||
    field.args.length > 0;

  const parentSelections = () => {
    if (selection && 'selectionSet' in selection && selection.selectionSet) {
      return selection.selectionSet.selections;
    }
    return [];
  };
  // console.log('rendering Field', {
  //   ancestors,
  //   name: field.name,
  //   selection,
  //   parentSelections: parentSelections(),
  // });

  let childFieldsToRender: React.ReactNode = null;

  if (isObjectType(unwrappedType) || isInterfaceType(unwrappedType)) {
    const fields = unwrappedType.getFields();
    childFieldsToRender = fields && (
      <Fields
        ancestors={ancestors}
        fields={unwrappedType.getFields()}
        parentSelections={parentSelections()}
      />
    );
  } else if (isUnionType(unwrappedType)) {
    childFieldsToRender = (
      <Union
        ancestors={ancestors}
        parentSelections={parentSelections()}
        unionType={unwrappedType}
      />
    );
  }

  return (
    <ListItem
      collapsibleContent={
        isCollapsible
          ? {
              arguments: field.args.length > 0 && (
                <Arguments ancestors={ancestors} selection={selection as FieldNode} />
              ),
              childFields: childFieldsToRender,
            }
          : undefined
      }
      isSelected={!!selection}
      toggler={{
        ancestors,
        isSelected: !!selection,
        variant: 'FIELD',
      }}
      type={field}
      variant="FIELD"
    />
  );
};
