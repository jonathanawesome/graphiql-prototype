import {
  ArgumentNode,
  GraphQLArgument,
  GraphQLField,
  OperationDefinitionNode,
  OperationTypeNode,
  SelectionNode,
} from 'graphql';
import { StoreApi } from 'zustand';

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

type ArgumentHandlingMode = 'INLINE' | 'WITH_VARIABLE';

export type PathfinderState = {
  argumentHandlingMode: ArgumentHandlingMode;
};

export type PathfinderActions = {
  toggle: ToggleSignature;
  setArgumentHandlingMode: ({ mode }: { mode: ArgumentHandlingMode }) => void;
};

export type PathfinderStore = PathfinderActions & PathfinderState;

export type GetPathfinderStore = StoreApi<PathfinderStore>['getState'];
export type SetPathfinderStore = StoreApi<PathfinderStore>['setState'];
