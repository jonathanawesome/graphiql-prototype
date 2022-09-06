import { useEffect, useRef, useState } from 'react';

// components
import { MonacoEditor } from '../MonacoEditor';
import { OperationActions } from '../OperationActions';
import { OperationTools } from '../OperationTools';

// styles
import {
  OperationActionsWrap,
  OperateWrap,
  OperationEditor,
  OperationToolsWrap,
} from './styles';
import { Resizer } from '@graphiql-prototype/ui-library';

export const Operate = () => {
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
    <OperateWrap ref={containerRef}>
      <Resizer
        direction="vertical"
        handleStyle="ghost"
        pane1={{
          initialFlexGrowValue: 1,
          component: (
            <OperationEditor ref={operationsEditorRef}>
              <MonacoEditor monacoEditorType="operations" />
              <OperationActionsWrap>
                <OperationActions />
              </OperationActionsWrap>
            </OperationEditor>
          ),
        }}
        pane2={{
          component: (
            <OperationToolsWrap ref={operationsToolsRef}>
              <OperationTools />
            </OperationToolsWrap>
          ),
        }}
      />
    </OperateWrap>
  );
};
