import {
  ArgumentNode,
  FieldNode,
  GraphQLArgument,
  GraphQLField,
  ObjectFieldNode,
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
  arg: GraphQLArgument;
  /** we use onInputTypeName when we add a new InputTypeArgument to an InputType that is NOT selected */
  onInputTypeName: string | null;
  parentSelection: FieldNode | ArgumentNode | null;
  /** we use placement to decide which toggle functions to run (xxxFieldArgument or xxxInputTypeArgument) */
  placement: 'ON_FIELD' | 'ON_INPUT_TYPE';
  selection: ArgumentNode | undefined;
  variableName: string;
};

export type AncestorField = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
  selection: AncestorSelection;
  selectionSet: AncestorSelectionSet;
};

export type AncestorInputType = {
  onInputType: string;
  parent: FieldNode;
  selection: ArgumentNode | undefined;
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
  | AncestorArgument
  | AncestorInputType;

/** we're using a Map here so that we can take advantage of the insertion order */
export type AncestorMap = Map<string, AncestorTypes>;

export type NextSelectionSet = SelectionSetNode | null;
export type NextVariableDefinitions = VariableDefinitionNode[] | undefined;
export type NextArguments = ArgumentNode[] | null;
// export type NextArguments = ArgumentNode[] | ObjectFieldNode[] | null;

type ToggleSignature = ({ ancestors }: { ancestors: AncestorMap }) => void;
export type SetNextSelectionSetSignature = ({
  nextSelectionSet,
}: {
  nextSelectionSet: SelectionSetNode | null;
}) => void;

export type SetNextVariableDefinitionsSignature = ({
  nextVariableDefinitions,
}: {
  nextVariableDefinitions: VariableDefinitionNode[] | undefined;
}) => void;

export type SetNextArgumentsSignature = ({
  nextArguments,
}: {
  nextArguments: ArgumentNode[] | null;
}) => void;

export type TogglerStore = {
  nextSelectionSet: NextSelectionSet;
  setNextSelectionSet: SetNextSelectionSetSignature;
  nextVariableDefinitions: NextVariableDefinitions;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
  nextArguments: NextArguments;
  setNextArguments: SetNextArgumentsSignature;
  toggle: ToggleSignature;
};
