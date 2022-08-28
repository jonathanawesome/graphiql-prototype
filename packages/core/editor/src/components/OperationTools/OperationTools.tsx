import { useState } from 'react';

// components
import { ChevronLarge } from '@graphiql-prototype/ui-library';
import { Headers } from '../Headers';
import { Variables } from '../Variables';

// styles
import {
  CollapsibleContent,
  CollapsibleRoot,
  CollapsibleTrigger,
  TabsAndTrigger,
  TabsContent,
  TabsList,
  TabsRoot,
  TabsTrigger,
} from './styles';

// utils
import { useEditor } from '@graphiql-prototype/use-editor';

export const OperationTools = ({ setHeight }: { setHeight: () => void }) => {
  const [isOperationToolsOpen, setIsOperationToolsOpen] = useState<boolean>(false);
  const [openTab, setOpenTab] = useState('');
  const activeTab = useEditor().getActiveTab();

  // console.log('rendering OperationTools', { activeEditorTab });

  const variablesCount = activeTab.operationDefinition?.variableDefinitions?.length || 0;

  const handleOpenChange = () => {
    if (!isOperationToolsOpen) {
      setIsOperationToolsOpen(true);
      setOpenTab('VariablesTab');
    } else {
      setIsOperationToolsOpen(false);
      setOpenTab('');
    }
    setTimeout(() => {
      //TODO: trigger editor.layout() to resize the editor
      setHeight();
    }, 150);
  };

  return (
    <CollapsibleRoot open={isOperationToolsOpen} onOpenChange={handleOpenChange}>
      <TabsRoot value={openTab} onValueChange={setOpenTab}>
        <TabsAndTrigger>
          <TabsList aria-label="Operations Tools">
            <TabsTrigger
              value="VariablesTab"
              onClick={() => {
                if (!isOperationToolsOpen) {
                  setIsOperationToolsOpen(true);
                }
              }}
            >
              Variables {variablesCount > 0 && <span>{variablesCount}</span>}
            </TabsTrigger>
            <TabsTrigger
              value="HeadersTab"
              onClick={() => {
                if (!isOperationToolsOpen) {
                  setIsOperationToolsOpen(true);
                }
              }}
            >
              Headers
            </TabsTrigger>
          </TabsList>
          <CollapsibleTrigger isOperationToolsOpen={isOperationToolsOpen}>
            <ChevronLarge />
          </CollapsibleTrigger>
        </TabsAndTrigger>
        <CollapsibleContent forceMount hidden={!isOperationToolsOpen}>
          <TabsContent
            value="VariablesTab"
            forceMount
            hidden={openTab !== 'VariablesTab'}
          >
            <Variables />
          </TabsContent>
          <TabsContent value="HeadersTab" forceMount hidden={openTab !== 'HeadersTab'}>
            <Headers />
          </TabsContent>
        </CollapsibleContent>
      </TabsRoot>
    </CollapsibleRoot>
  );
};
