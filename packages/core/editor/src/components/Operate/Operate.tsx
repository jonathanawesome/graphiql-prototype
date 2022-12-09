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
    <div className={StyledOperateWrap()}>
      <div className={StyledOperationEditor()}>
        <MonacoEditor monacoEditorType="operations" />
        <div className={StyledOperationActionsWrap()}>
          <OperationActions />
        </div>
      </div>
      <div className={StyledOperationToolsWrap()}>
        <OperationTools />
      </div>
    </div>
  );
};
