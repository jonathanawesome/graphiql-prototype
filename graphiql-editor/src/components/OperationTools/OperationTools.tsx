import { useState } from 'react';

/** components */
import { Chevron } from '@graphiql-v2-prototype/graphiql-ui-library';
import { Headers } from '../Headers';
import { Variables } from '../Variables';

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
} from './styles';

/** utils */
import { getActiveEditorTab } from '../../utils';

export const OperationTools = ({ setHeight }: { setHeight: () => void }) => {
  const [isOperationToolsOpen, setIsOperationToolsOpen] = useState<boolean>(false);
  const [openTab, setOpenTab] = useState('');
  const activeEditorTab = getActiveEditorTab();

  const variablesCount =
    activeEditorTab?.operationDefinition?.variableDefinitions?.length || 0;

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
            <Chevron />
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
