// components
import { Message, Play, Prettier } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import { StyledOperationActions, PlayButton, PrettierButton } from './styles';

export const OperationActions = () => {
  const { monacoEditors, warningWhenMultipleOperations } = useEditor();
  const { executeOperation } = useSchema();

  const operationEditor = monacoEditors.operations;

  return (
    <StyledOperationActions>
      {warningWhenMultipleOperations && (
        <div>
          <Message
            message={
              <>
                It looks like you're trying to run multiple operations. This is supported
                by *some* GraphQL servers, but is not spec-compliant. Additionally,
                Pathfinder only interprets the first operation. You can continue with
                multiple operations and they'll be sent to your server, but we recommend
                <button>splitting additional operations into separate tabs.</button>
              </>
            }
            variant="WARNING"
          />
        </div>
      )}
      <PlayButton
        onClick={() => {
          executeOperation();
        }}
      >
        <Play />
      </PlayButton>
      <PrettierButton
        onClick={() => operationEditor?.getAction('editor.action.formatDocument').run()}
      >
        <Prettier />
      </PrettierButton>
    </StyledOperationActions>
  );
};
