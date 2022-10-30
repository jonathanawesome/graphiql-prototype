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
      <StyledOperationActionsWrap>
        <OperationActions />
      </StyledOperationActionsWrap>
      <StyledOperationEditor>
        <MonacoEditor monacoEditorType="operations" />
      </StyledOperationEditor>
      <StyledOperationToolsWrap>
        <OperationTools />
      </StyledOperationToolsWrap>
    </StyledOperateWrap>
  );
};
