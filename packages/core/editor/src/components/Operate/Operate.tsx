// components
import { MonacoEditor } from '../MonacoEditor';
import { OperationActions } from '../OperationActions';
import { OperationTools } from '../OperationTools';

// styles
import {
  OperateWrap,
  OperationEditor,
  OperationActionsWrap,
  OperationToolsWrap,
} from './styles';

export const Operate = () => {
  return (
    <OperateWrap>
      <OperationEditor>
        <MonacoEditor monacoEditorType="operations" />
        <OperationActionsWrap>
          <OperationActions />
        </OperationActionsWrap>
      </OperationEditor>
      <OperationToolsWrap>
        <OperationTools />
      </OperationToolsWrap>
    </OperateWrap>
  );
};
