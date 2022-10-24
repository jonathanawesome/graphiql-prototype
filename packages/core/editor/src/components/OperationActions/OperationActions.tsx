import shallow from 'zustand/shallow';

// components
import { Icon, Play, Prettier } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/store';
import { useSchema } from '@graphiql-prototype/store';

// styles
import {
  StyledOperationActions,
  StyledPlayButton,
  StyledPlayButtonType,
  StyledPrettierButton,
  StyledWarningButton,
} from './styles';
import { OperationDefinitionNode } from 'graphql';

export const OperationActions = () => {
  const {
    activeDefinition,
    documentDefinitions,
    monacoEditors,
    splitMultipleOperationsToSeparateTabs,
  } = useEditor(
    (state) => ({
      activeDefinition: state.activeDefinition,
      documentDefinitions: state.documentDefinitions,
      monacoEditors: state.monacoEditors,
      splitMultipleOperationsToSeparateTabs: state.splitMultipleOperationsToSeparateTabs,
    }),
    shallow
  );

  const { executeOperation } = useSchema();

  const operationEditor = monacoEditors.operations;

  return (
    <StyledOperationActions>
      <StyledPlayButton
        onClick={() => {
          executeOperation();
        }}
        isDisabled={!activeDefinition}
      >
        <>
          <Play />
          <StyledPlayButtonType>
            {(activeDefinition &&
              (activeDefinition as OperationDefinitionNode).name?.value) ||
              'Run'}
          </StyledPlayButtonType>
        </>
      </StyledPlayButton>
      <StyledPrettierButton
        onClick={() => operationEditor?.getAction('editor.action.formatDocument').run()}
      >
        <Prettier />
      </StyledPrettierButton>
      {documentDefinitions > 1 && (
        <StyledWarningButton
          onClick={() => splitMultipleOperationsToSeparateTabs()}
          title={`Split multiple operations into separate tabs`}
        >
          <Icon name="SplitToTabs" />
        </StyledWarningButton>
      )}
    </StyledOperationActions>
  );
};
