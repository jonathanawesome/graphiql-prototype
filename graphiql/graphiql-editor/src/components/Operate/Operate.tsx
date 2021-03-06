import { useEffect, useRef, useState } from 'react';

// components
import { MonacoEditor } from '../MonacoEditor';
import { OperationActions } from '../OperationActions';
import { OperationTools } from '../OperationTools';

// hooks
import { useGraphiQLEditor } from '../../hooks';

// styles
import {
  OperationActionsWrap,
  OperateWrap,
  OperationEditor,
  OperationToolsWrap,
} from './styles';

export const Operate = () => {
  const { editorTabs } = useGraphiQLEditor();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const operationsEditorRef = useRef<HTMLDivElement | null>(null);
  const operationsToolsRef = useRef<HTMLDivElement | null>(null);

  const [operationEditorHeight, setOperationEditorHeight] = useState<null | number>(null);

  useEffect(() => {
    setHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationEditorHeight]);

  const setHeight = () => {
    if (
      operationsEditorRef.current &&
      operationsToolsRef.current &&
      containerRef.current
    ) {
      if (!operationEditorHeight) {
        return setOperationEditorHeight(operationsEditorRef.current.clientHeight);
      }
      operationsEditorRef.current.style.height = `${
        containerRef.current.clientHeight - operationsToolsRef.current.clientHeight
      }px`;
    }
    return undefined;
  };

  return (
    <OperateWrap ref={containerRef} expanded={editorTabs.length < 2}>
      <OperationEditor ref={operationsEditorRef}>
        <MonacoEditor editorType="operations" />
        <OperationActionsWrap>
          <OperationActions />
        </OperationActionsWrap>
      </OperationEditor>
      <OperationToolsWrap ref={operationsToolsRef}>
        <OperationTools setHeight={setHeight} />
      </OperationToolsWrap>
    </OperateWrap>
  );
};
