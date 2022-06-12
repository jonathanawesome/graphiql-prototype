import { useEffect, useState } from 'react';
import { editor as MONACO_EDITOR } from 'monaco-editor';

/** components */
import { Chevron } from '@graphiql-v2-prototype/graphiql-ui-library';
import { MonacoEditor } from '../MonacoEditor';

/** styles */
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  TabsAndTrigger,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
  VariablesEditor,
} from './styles';

/** utils */
import { getActiveEditorTab } from '../../utils';

const Headers = () => {
  return <span style={{ fontSize: '10px' }}>TODO: Headers...please send help 🦺</span>;
};

export const OperationTools = ({
  setHeight,
  variablesModel,
}: {
  setHeight: () => void;
  variablesModel: MONACO_EDITOR.ITextModel;
}) => {
  const [isVariablesOpen, setIsVariablesOpen] = useState<boolean>(false);
  const [openTab, setOpenTab] = useState('tab1');
  const activeEditorTab = getActiveEditorTab();

  const variablesCount =
    activeEditorTab?.operationDefinition?.variableDefinitions?.length || 0;

  const handleOpenChange = () => {
    setIsVariablesOpen(!isVariablesOpen);
    setTimeout(() => {
      //TODO: trigger editor.layout() to resize the editor
      setHeight();
    }, 150);
  };

  useEffect(() => {
    if (variablesCount > 0) {
      setIsVariablesOpen(true);
    } else {
      setIsVariablesOpen(false);
    }
  }, [variablesCount]);

  return (
    <CollapsibleRoot open={isVariablesOpen} onOpenChange={handleOpenChange}>
      <TabsRoot value={openTab} onValueChange={setOpenTab}>
        <TabsAndTrigger>
          <TabsList aria-label="Operations Tools">
            <TabsTrigger
              value="tab1"
              onClick={() => setIsVariablesOpen(!isVariablesOpen)}
            >
              EasyVars
            </TabsTrigger>
            <TabsTrigger
              value="tab2"
              onClick={() => setIsVariablesOpen(!isVariablesOpen)}
            >
              Variables {variablesCount > 0 && <span>{variablesCount}</span>}
            </TabsTrigger>
            <TabsTrigger
              value="tab3"
              onClick={() => setIsVariablesOpen(!isVariablesOpen)}
            >
              Headers
            </TabsTrigger>
          </TabsList>
          <CollapsibleTrigger>
            <Chevron active={isVariablesOpen} />
          </CollapsibleTrigger>
        </TabsAndTrigger>
        <CollapsibleContent>
          <TabsContent value="tab1">
            <p>easy vars here</p>
            {/* <EasyVars easyVars={variables} /> */}
          </TabsContent>
          <TabsContent value="tab2" forceMount hidden={openTab !== 'tab2'}>
            <VariablesEditor>
              <MonacoEditor editorType="variables" initWithModel={variablesModel} />
            </VariablesEditor>
          </TabsContent>
          <TabsContent value="tab3">
            <Headers />
          </TabsContent>
        </CollapsibleContent>
      </TabsRoot>
    </CollapsibleRoot>
  );
};
