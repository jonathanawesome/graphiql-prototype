import {
  ExecutableDefinitionNode,
  GraphQLArgument,
  GraphQLInputType,
  GraphQLSchema,
  OperationDefinitionNode,
} from 'graphql';
// import { editor } from 'monaco-editor';

export type EasyVar = {
  variableName: string;
  variableType: GraphQLInputType;
  variableValue: string | string[];
  argument: GraphQLArgument;
};
export type EasyVars = Array<EasyVar>;

// type Surveyor = {
//   surveyorId: string;
//   surveyorName: string;
//   operationModel: editor.ITextModel;
//   variablesModel: editor.ITextModel;
//   resultsModel: editor.ITextModel;
//   operation: string;
//   variables: string;
//   results: string;
//   operationDefinition: ExecutableDefinitionNode | null;
// };

export type GraphiQLStore = {
  // activeSurveyor: string | null;
  // setActiveSurveyor: ({ surveyorId }: { surveyorId: string }) => void;
  // surveyors: Surveyor[];
  // addSurveyor: ({ surveyor }: { surveyor: Surveyor }) => void;
  // updateSurveyorData: ({
  //   type,
  //   newValue,
  // }: {
  //   type: EditorTypes;
  //   newValue: string;
  // }) => void;
  // removeSurveyor: ({ surveyorId }: { surveyorId: string }) => void;
  // swapSurveyor: ({ surveyorId }: { surveyorId: string }) => void;
  // editors bits are here only to offer editors and their actions across components (see PrettierButton)
  // there's probably a better way to do this
  // editors: Array<{
  //   editor: editor.IStandaloneCodeEditor;
  //   name: EditorTypes;
  // }>;
  // addEditor: ({
  //   editor,
  //   name,
  // }: {
  //   editor: editor.IStandaloneCodeEditor;
  //   name: EditorTypes;
  // }) => void;
  // setResults: ({ value }: { value: string }) => void;
  variables: EasyVars;
  addVariable: ({ easyVar }: { easyVar: EasyVar }) => void;
  updateVariable: ({
    variableName,
    variableValue,
  }: {
    variableName: string;
    variableValue: string | string[];
  }) => void;
  removeVariables: ({ variableNames }: { variableNames: string[] }) => void;
  operationDefinition: ExecutableDefinitionNode | null;
  setOperationDefinition: ({
    operationDefinition,
  }: {
    operationDefinition: ExecutableDefinitionNode | null;
  }) => void;
  // schema: GraphQLSchema | null;
  // schemaUrl: string | null;
  // initSchema: ({ url }: { url?: string }) => Promise<void>;
  operation: string;
  setOperation: ({ value }: { value: string }) => void;
  // executeOperation: () => Promise<void>;
  // operationAction: () => editor.IActionDescriptor;
  onEditDefinition: ({
    nextDefinition,
  }: {
    nextDefinition: OperationDefinitionNode | null;
  }) => void;
};
