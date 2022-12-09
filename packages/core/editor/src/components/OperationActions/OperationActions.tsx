import shallow from 'zustand/shallow';

// components
import { Icon } from '@graphiql-prototype/ui-library';

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
    <div className={StyledOperationActions()}>
      <button
        className={StyledPlayButton({ isDisabled: !activeDefinition })}
        onClick={() => {
          executeOperation();
        }}
      >
        <>
          <Icon name="Play" />
          <span className={StyledPlayButtonType()}>
            {(activeDefinition &&
              (activeDefinition as OperationDefinitionNode).name?.value) ||
              'Run'}
          </span>
        </>
      </button>
      <button
        className={StyledPrettierButton()}
        onClick={() => operationEditor?.getAction('editor.action.formatDocument').run()}
      >
        <Icon name="Prettier" />
      </button>
      {documentDefinitions > 1 && (
        <button
          className={StyledWarningButton()}
          onClick={() => splitMultipleOperationsToSeparateTabs()}
          title={`Split multiple operations into separate tabs`}
        >
          <Icon name="SplitToTabs" />
        </button>
      )}
    </div>
  );
};
