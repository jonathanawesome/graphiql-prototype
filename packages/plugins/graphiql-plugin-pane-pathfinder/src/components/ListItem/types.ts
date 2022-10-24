import {
  GraphQLField,
  GraphQLArgument,
  GraphQLInputObjectType,
  GraphQLObjectType,
} from 'graphql';
import { AncestorsArray } from '../../hooks';

import type { ToggleProps } from '../Toggler';

export type ListItemVariants = 'ARGUMENT' | 'FIELD' | 'INLINE_FRAGMENT' | 'INPUT_OBJECT';
// | 'ROOT'

export type ListItemTypeTypes =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  GraphQLField<any, any> | GraphQLArgument | GraphQLInputObjectType | GraphQLObjectType;

type ListItemBaseProps = {
  ancestors: AncestorsArray;
  isSelected: boolean;
  type: ListItemTypeTypes;
  variant: ListItemVariants;
};

type ListItemWithToggleProps = {
  toggler?: ToggleProps;
};

type ListItemWithCollapserProps = {
  collapsibleContent?: {
    arguments?: React.ReactNode;
    childFields?: React.ReactNode;
  };
};

export type ListItemProps = ListItemBaseProps &
  ListItemWithToggleProps &
  ListItemWithCollapserProps;
