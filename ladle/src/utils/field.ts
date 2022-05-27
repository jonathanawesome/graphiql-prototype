/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FieldNode,
  GraphQLField,
  GraphQLFieldMap,
  GraphQLOutputType,
  InlineFragmentNode,
  isInterfaceType,
  isListType,
  isNonNullType,
  isObjectType,
  isUnionType,
  Kind,
  SelectionNode,
} from 'graphql';
import { useGraphiQL } from '../hooks';

export const getTypeFields = ({
  type,
}: {
  type: GraphQLOutputType;
}): GraphQLFieldMap<any, any> | null => {
  const schema = useGraphiQL.getState().schema;
  if (isObjectType(type)) {
    // console.log('isObjectType');

    return type.getFields();
  } else if (isInterfaceType(type)) {
    // console.log('isInterfaceType');

    return type.getFields();
  } else if (isListType(type)) {
    // console.log('isListType');

    return getTypeFields({ type: type.ofType });
  } else if (isNonNullType(type)) {
    // console.log('isNonNullType');
    return getTypeFields({ type: type.ofType });
  } else if (isUnionType(type)) {
    console.log('isUnionType', { types: schema?.getPossibleTypes(type) });
    // return schema?.getPossibleTypes(type);
  }

  return null;
};

export const findSelection = ({
  fieldName,
  selections,
}: {
  fieldName: string;
  selections: SelectionNode[];
}): InlineFragmentNode | FieldNode | undefined => {
  const selectionNode = selections?.find(
    // (selection) => selection.name.value === field.name
    (selection) => {
      if (selection.kind === Kind.INLINE_FRAGMENT) {
        return selection.typeCondition?.name.value === fieldName;
      } else if (selection.kind === Kind.FRAGMENT_SPREAD) {
        //TODO handle fragment spreads
        // return null;
      }
      // otherwise, it's a FIELD
      return selection.name.value === fieldName;
    }
  );

  if (selectionNode) {
    if (selectionNode.kind === Kind.INLINE_FRAGMENT) {
      return selectionNode as InlineFragmentNode;
    }
    if (selectionNode.kind === Kind.FIELD) {
      return selectionNode as FieldNode;
    }
  }
  return undefined;
};
