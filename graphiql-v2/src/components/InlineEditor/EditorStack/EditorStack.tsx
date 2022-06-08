import { useEffect, useRef, useState } from 'react';

/** components */
// import { Editor } from '../Editor';
import { EditorActions } from '../EditorActions';
import { VariablesAndHeaders } from '../VariablesAndHeaders';

/** constants */
// import { defaultOperation } from '../../../constants';

/** hooks */
// import { useGraphiQL } from '../../../hooks';

/** styles */
import {
  EditorActionsWrap,
  EditorStackContainer,
  OperationsEditor,
  VariablesAndHeadersWrap,
} from './styles';
import { editor } from 'monaco-editor';

export const EditorStack = ({
  operationModel,
  variablesModel,
}: {
  operationModel: editor.ITextModel;
  variablesModel: editor.ITextModel;
}) => {
  // const {
  //   //  operationAction,
  //   operation,
  //   setOperation,
  // } = useGraphiQL();

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
    <EditorStackContainer ref={containerRef}>
      <OperationsEditor ref={operationsEditorRef}>
        {/* <Editor
          // action={operationAction()}
          // defaultValue={defaultOperation}
          // language="graphql"
          // hashedUri={opsUri}
          // value={operation}
          // valueSetter={setOperation}
          editorType="operations"
          model={operationModel}
        /> */}
        <EditorActionsWrap>
          <EditorActions />
        </EditorActionsWrap>
      </OperationsEditor>
      <VariablesAndHeadersWrap ref={bottomPaneRef}>
        <VariablesAndHeaders setHeight={setHeight} />
      </VariablesAndHeadersWrap>
    </EditorStackContainer>
  );
};
