import {
  GraphQLScalarType,
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLUnionType,
  GraphQLInterfaceType,
  GraphQLField,
  GraphQLNamedType,
  GraphQLDirective,
  GraphQLInputField,
} from 'graphql';

export type TopLevelPane =
  | 'Query'
  | 'Mutation'
  | 'Subscription'
  | 'Directives'
  | 'Scalars'
  | 'Enums'
  | 'Objects'
  | 'Input Objects'
  | 'Unions'
  | 'Interfaces';

export type SortedTypeMap = {
  Scalars: GraphQLScalarType[];
  Enums: GraphQLEnumType[];
  Objects: GraphQLObjectType[];
  'Input Objects': GraphQLInputObjectType[];
  Unions: GraphQLUnionType[];
  Interfaces: GraphQLInterfaceType[];
};

export type TertiaryPaneType =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | GraphQLField<any, any>
  | GraphQLNamedType
  | GraphQLDirective
  | GraphQLInterfaceType
  | GraphQLInputField;

type TertiaryPaneStackItem = { hash: string; pane: TertiaryPaneType };

export type SchemaReferenceStore = {
  activePrimaryPane: TopLevelPane;
  setActivePrimaryPane: ({ destinationPane }: { destinationPane: TopLevelPane }) => void;
  activeTertiaryPane: TertiaryPaneStackItem | null;
  tertiaryPaneStack: TertiaryPaneStackItem[];
  clearTertiaryPaneStack: () => void;
  navigateTertiaryPaneStack: ({
    destinationPaneIndex,
  }: {
    destinationPaneIndex: number;
  }) => void;
  setActiveTertiaryPane: ({
    destinationPane,
    reset,
  }: {
    destinationPane: TertiaryPaneType;
    reset?: boolean;
  }) => void;
};
