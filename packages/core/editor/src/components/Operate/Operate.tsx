// components
import { MonacoEditor } from '../MonacoEditor';
import { OperationActions } from '../OperationActions';
import { OperationTools } from '../OperationTools';

// hooks

// styles
import {
  StyledOperateWrap,
  StyledOperationEditor,
  StyledOperationActionsWrap,
  StyledOperationToolsWrap,
} from './styles';

export const Operate = () => {
  return (
    <StyledOperateWrap>
      <StyledOperationEditor>
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
