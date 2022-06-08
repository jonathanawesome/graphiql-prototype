import { useEffect, useRef, useState } from 'react';
import { editor } from 'monaco-editor';

/** components */
import { Editor } from '../Editor';
import { OperationActions } from '../OperationActions';
import { CollectTools } from '../CollectTools';

/** styles */
import {
  EditorActionsWrap,
  CollectWrap,
  OperationsEditor,
  CollectToolsWrap,
} from './styles';

export const Collect = ({
  operationModel,
  variablesModel,
}: {
  operationModel: editor.ITextModel;
  variablesModel: editor.ITextModel;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const operationsEditorRef = useRef<HTMLDivElement | null>(null);
  const bottomPaneRef = useRef<HTMLDivElement | null>(null);

  const [operationsEditorHeight, setOperationsEditorHeight] = useState<null | number>(
    null
  );

  useEffect(() => {
    setHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [operationsEditorHeight]);

  const setHeight = () => {
    if (operationsEditorRef.current && bottomPaneRef.current && containerRef.current) {
      if (!operationsEditorHeight) {
        return setOperationsEditorHeight(operationsEditorRef.current.clientHeight);
      }
      operationsEditorRef.current.style.height = `${
        containerRef.current.clientHeight - bottomPaneRef.current.clientHeight
      }px`;
    }
    return undefined;
  };

  return (
    <CollectWrap ref={containerRef}>
      <OperationsEditor ref={operationsEditorRef}>
        <Editor editorType="operation" initWithModel={operationModel} />
        <EditorActionsWrap>
          <OperationActions />
        </EditorActionsWrap>
      </OperationsEditor>
      <CollectToolsWrap ref={bottomPaneRef}>
        <CollectTools setHeight={setHeight} variablesModel={variablesModel} />
      </CollectToolsWrap>
    </CollectWrap>
  );
};
