import { useEffect, useRef, useState } from 'react';
import {
  Root as CollapsibleRoot,
  Trigger as CollapsibleTrigger,
  Content as CollapsibleContent,
} from '@radix-ui/react-collapsible';

/** components */
import { Chevron, Editor, EditorActions } from '@/components';

/** constants */
import { defaultOperation, defaultVariables } from '@/constants';

/** hooks */
import { useGraphiQL } from '@/hooks';

/** styles */
import {
  Bottom,
  EditorActionsWrap,
  EditorStackContainer,
  FakeTabs,
  OperationsEditor,
  TabsAndTrigger,
  Top,
  VariablesEditor,
} from './styles';

export const EditorStack = () => {
  const { operationAction, operation, variables, setOperation, setVariables } =
    useGraphiQL();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const topPaneRef = useRef<HTMLDivElement | null>(null);
  const bottomPaneRef = useRef<HTMLDivElement | null>(null);

  const [topPaneHeight, setTopPaneHeight] = useState<null | number>(null);

  const [isVariablesOpen, setIsVariablesOpen] = useState<boolean>(false);

  useEffect(() => {
    setTopHeight();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topPaneHeight]);

  const setTopHeight = () => {
    if (topPaneRef.current && bottomPaneRef.current && containerRef.current) {
      if (!topPaneHeight) {
        return setTopPaneHeight(topPaneRef.current.clientHeight);
      }
      topPaneRef.current.style.height = `${
        containerRef.current.clientHeight - bottomPaneRef.current.clientHeight
      }px`;
    }
    return undefined;
  };

  const handleOpenChange = () => {
    // console.log('running handle open change');
    setIsVariablesOpen(!isVariablesOpen);
    //TODO can we get this height value from radix-ui/Collapsible?
    setTimeout(() => {
      //TODO: trigger editor.layout() to resize the editor
      setTopHeight();
    }, 150);
  };

  return (
    <EditorStackContainer ref={containerRef}>
      <Top ref={topPaneRef}>
        <OperationsEditor>
          <Editor
            action={operationAction()}
            defaultValue={defaultOperation}
            language="graphql"
            uri="OPERATIONS_EDITOR_URI"
            value={operation}
            valueSetter={setOperation}
          />
          <EditorActionsWrap>
            <EditorActions />
          </EditorActionsWrap>
        </OperationsEditor>
      </Top>
      <Bottom ref={bottomPaneRef}>
        <FakeTabs>
          <CollapsibleRoot open={isVariablesOpen} onOpenChange={handleOpenChange}>
            <TabsAndTrigger>
              <span onClick={() => alert('Variables Tab...Todo!')}>Variables</span>
              <span onClick={() => alert('Headers Tab...Todo!')}>Headers</span>
              <CollapsibleTrigger>
                <div
                  style={{ transform: isVariablesOpen ? undefined : 'rotate(180deg)' }}
                >
                  <Chevron />
                </div>
              </CollapsibleTrigger>
            </TabsAndTrigger>
            <CollapsibleContent>
              <VariablesEditor>
                <Editor
                  action={operationAction()}
                  defaultValue={defaultVariables}
                  language="json"
                  uri="VARIABLES_EDITOR_URI"
                  value={variables}
                  valueSetter={setVariables}
                />
              </VariablesEditor>
            </CollapsibleContent>
          </CollapsibleRoot>
        </FakeTabs>
      </Bottom>
    </EditorStackContainer>
  );
};
