import { useRef } from 'react';

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
  const containerRef = useRef<HTMLDivElement | null>(null);
  const operationsEditorRef = useRef<HTMLDivElement | null>(null);
  const operationsToolsRef = useRef<HTMLDivElement | null>(null);

  return (
    <OperateWrap ref={containerRef}>
      <OperationEditor ref={operationsEditorRef}>
        <MonacoEditor monacoEditorType="operations" />
        <OperationActionsWrap>
          <OperationActions />
        </OperationActionsWrap>
      </OperationEditor>
      <OperationToolsWrap ref={operationsToolsRef}>
        <OperationTools />
      </OperationToolsWrap>
    </OperateWrap>
  );
};
