import {
  ArgumentNode,
  GraphQLArgument,
  GraphQLField,
  OperationTypeNode,
  SelectionNode,
  SelectionSetNode,
  VariableDefinitionNode,
} from 'graphql';

type AncestorSelection = SelectionNode | null;
type AncestorSelectionSet = SelectionSetNode | undefined;

export type AncestorRoot = {
  rootTypeName: string;
};

export type AncestorArgument = {
  argument: GraphQLArgument;
  selection: ArgumentNode | undefined;
  variableName: string;
};

export type AncestorField = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
  selection: AncestorSelection;
  selectionSet: AncestorSelectionSet;
};

export type AncestorInlineFragment = {
  onType: string;
  selection: AncestorSelection;
  selectionSet: AncestorSelectionSet;
};

export type AncestorTypes =
  | AncestorRoot
  | AncestorField
  | AncestorInlineFragment
  | AncestorArgument;

// we're using a Map here so that we can take advantage of the insertion order
export type AncestorMap = Map<string, AncestorTypes>;

type ToggleSignature = ({
  ancestors,
  operationType,
}: {
  ancestors: AncestorMap;
  operationType: OperationTypeNode;
}) => void;

// begin root type
export type NextOperationType = OperationTypeNode | null;
export type SetNextOperationType = ({
  nextOperationType,
}: {
  nextOperationType: OperationTypeNode | null;
}) => void;
// end root type

// begin selection set
export type NextSelectionSet = SelectionSetNode | null;
export type SetNextSelectionSetSignature = ({
  nextSelectionSet,
}: {
  nextSelectionSet: SelectionSetNode | null;
}) => void;
// end selection set

// begin variable definitions
export type NextVariableDefinitions = VariableDefinitionNode[] | undefined;
export type SetNextVariableDefinitionsSignature = ({
  nextVariableDefinitions,
}: {
  nextVariableDefinitions: VariableDefinitionNode[] | undefined;
}) => void;
// end variable definitions

// begin edit actions
export type AddAction = {
  type: 'ADD';
  payload: { type: 'ARGUMENT'; node: ArgumentNode };
};

export type RemoveAction = {
  type: 'REMOVE';
  payload: { type: 'ARGUMENT'; nodeName: string };
};

export type NextAction = AddAction | RemoveAction | null;
export type SetNextActionSignature = (action: NextAction) => void;
// end edit action

export type PathfinderStore = {
  nextOperationType: NextOperationType;
  setNextOperationType: SetNextOperationType;
  nextSelectionSet: NextSelectionSet;
  setNextSelectionSet: SetNextSelectionSetSignature;
  nextVariableDefinitions: NextVariableDefinitions;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
  nextAction: NextAction;
  setNextAction: SetNextActionSignature;
  toggle: ToggleSignature;
};