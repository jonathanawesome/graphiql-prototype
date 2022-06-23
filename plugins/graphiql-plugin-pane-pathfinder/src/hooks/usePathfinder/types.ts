import {
  ArgumentNode,
  GraphQLArgument,
  GraphQLField,
  GraphQLInputField,
  GraphQLInputObjectType,
  GraphQLType,
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
  argument: GraphQLArgument;
  selection: ArgumentNode | undefined;
  variableName: string;
};

export type AncestorInputField = {
  inputField: GraphQLInputField;
  selection: ObjectFieldNode | undefined;
  variableName: string;
};

export type AncestorField = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: GraphQLField<any, any>;
  selection: AncestorSelection;
  selectionSet: AncestorSelectionSet;
};

export type AncestorInputObject = {
  inputObject: GraphQLInputObjectType;
  name: string;
  parentType: 'FIELD' | 'INPUT_OBJECT';
  selection: ArgumentNode | ObjectFieldNode | undefined;
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
  | AncestorInputObject
  | AncestorInputField;

/** we're using a Map here so that we can take advantage of the insertion order */
export type AncestorMap = Map<string, AncestorTypes>;

export type NextSelectionSet = SelectionSetNode | null;
export type NextVariableDefinitions = VariableDefinitionNode[] | undefined;

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

/** begin edit actions */
export type ObjectFieldAction = { node: ObjectFieldNode; type: 'INPUT_FIELD' };
export type ArgumentAction = { node: ArgumentNode; type: 'ARGUMENT' };
export type AddAction = {
  type: 'ADD';
  payload: ObjectFieldAction | ArgumentAction;
};

export type RemoveAction = {
  type: 'REMOVE';
  payload: { type: 'INPUT_FIELD' | 'ARGUMENT'; nodeName: string };
};

export type NextAction = AddAction | RemoveAction | null;
export type SetNextActionSignature = (action: NextAction) => void;
/** end edit action  */

/** begin options */
export type DescriptionsVisibility = 'Inline' | 'Below' | 'Off';
export type FieldsVisibility = 'On' | 'Off';
export type PillsVisibility = 'On' | 'Off';
/** end options */

export type PathfinderStore = {
  /** begin overlay */
  overlayVisible: boolean;
  overlayType: GraphQLType | null;
  setOverlayType: ({ overlayType }: { overlayType: GraphQLType }) => void;
  setOverlayVisibility: () => void;
  /** end overlay */

  /** begin options */
  descriptionsVisibility: DescriptionsVisibility;
  setDescriptionsVisibility: (val: DescriptionsVisibility) => void;
  fieldsVisibility: FieldsVisibility;
  setFieldsVisibility: (val: FieldsVisibility) => void;
  pillsVisibility: PillsVisibility;
  setPillsVisibility: (val: PillsVisibility) => void;
  /** end options */

  /** begin toggle */
  nextSelectionSet: NextSelectionSet;
  setNextSelectionSet: SetNextSelectionSetSignature;
  nextVariableDefinitions: NextVariableDefinitions;
  setNextVariableDefinitions: SetNextVariableDefinitionsSignature;
  nextAction: NextAction;
  setNextAction: SetNextActionSignature;
  toggle: ToggleSignature;
  /** end toggle */
};
