import {
  ArgumentNode,
  GraphQLArgument,
  GraphQLField,
  OperationDefinitionNode,
  OperationTypeNode,
  SelectionNode,
} from 'graphql';

type AncestorSelection = SelectionNode | null;

export type AncestorRoot = {
  type: 'ROOT';
  operationType: OperationTypeNode;
  operationDefinition: OperationDefinitionNode | null;
};

export type AncestorArgument = {
  type: 'ARGUMENT';
  argument: GraphQLArgument;
  selection: ArgumentNode | undefined;
};

export type AncestorField = {
  type: 'FIELD';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
  selection: AncestorSelection;
};

export type AncestorInlineFragment = {
  type: 'INLINE_FRAGMENT';
  onType: string;
  selection: AncestorSelection;
};

export type AncestorTypes =
  | AncestorRoot
  | AncestorField
  | AncestorInlineFragment
  | AncestorArgument;

export type AncestorsArray = AncestorTypes[];

type ToggleSignature = ({ ancestors }: { ancestors: AncestorsArray }) => void;

export type PathfinderStore = {
  toggle: ToggleSignature;
};
