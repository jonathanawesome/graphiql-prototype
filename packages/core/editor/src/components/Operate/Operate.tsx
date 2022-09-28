// components
import { Message } from '@graphiql-prototype/ui-library';
import { MonacoEditor } from '../MonacoEditor';
import { OperationActions } from '../OperationActions';
import { OperationTools } from '../OperationTools';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';

// styles
import {
  StyledOperateWrap,
  StyledOperationEditor,
  StyledOperationActionsWrap,
  StyledOperationToolsWrap,
  StyledMessageContainer,
} from './styles';

export const Operate = () => {
  const { warningWhenMultipleOperations } = useEditor();

  return (
    <StyledOperateWrap>
      <StyledOperationEditor>
        {/* {warningWhenMultipleOperations && (
          <StyledMessageContainer>
            <Message
              message={
                <>
                  It looks like you're trying to run multiple operations. This is
                  supported by *some* GraphQL servers, but is not spec-compliant.
                  Additionally, Pathfinder only interprets your first operation. You can
                  continue with multiple operations and they'll be sent to your server,
                  but we recommend
                  <button>splitting additional operations into separate tabs.</button>
                </>
              }
              variant="WARNING"
            />
          </StyledMessageContainer>
        )} */}
        <MonacoEditor monacoEditorType="operations" />
        <StyledOperationActionsWrap>
          <OperationActions />
        </StyledOperationActionsWrap>
      </StyledOperationEditor>
      <StyledOperationToolsWrap>
        <OperationTools />
      </StyledOperationToolsWrap>
    </StyledOperateWrap>
  );
};
