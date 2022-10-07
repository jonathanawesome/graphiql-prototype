// components
import { Icon, Play, Prettier } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/store';
import { useSchema } from '@graphiql-prototype/store';

// styles
import {
  StyledOperationActions,
  StyledPlayButton,
  StyledPrettierButton,
  StyledWarningButton,
} from './styles';

export const OperationActions = () => {
  const { monacoEditors, splitMultipleOperationsToSeparateTabs, getActiveTab } =
    useEditor();

  const { executeOperation } = useSchema();

  const operationEditor = monacoEditors.operations;

  return (
    <StyledOperationActions>
      <StyledPlayButton
        onClick={() => {
          executeOperation();
        }}
      >
        <Play />
      </StyledPlayButton>
      <StyledPrettierButton
        onClick={() => operationEditor?.getAction('editor.action.formatDocument').run()}
      >
        <Prettier />
      </StyledPrettierButton>
      {getActiveTab()?.warningWhenMultipleOperations && (
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
