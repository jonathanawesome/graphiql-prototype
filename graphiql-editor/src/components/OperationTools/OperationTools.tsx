import { useEffect, useState } from 'react';
import { editor as MONACO_EDITOR } from 'monaco-editor';

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

export const OperationTools = ({
  setHeight,
  variablesModel,
}: {
  setHeight: () => void;
  variablesModel: MONACO_EDITOR.ITextModel;
}) => {
  const [isOperationToolsOpen, setIsOperationToolsOpen] = useState<boolean>(false);
  const [openTab, setOpenTab] = useState('VariablesTab');
  const activeEditorTab = getActiveEditorTab();

  const variablesCount =
    activeEditorTab?.operationDefinition?.variableDefinitions?.length || 0;

  const handleOpenChange = () => {
    setIsOperationToolsOpen(!isOperationToolsOpen);
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
              onClick={() => setIsOperationToolsOpen(!isOperationToolsOpen)}
            >
              Variables {variablesCount > 0 && <span>{variablesCount}</span>}
            </TabsTrigger>
            <TabsTrigger
              value="HeadersTab"
              onClick={() => setIsOperationToolsOpen(!isOperationToolsOpen)}
            >
              Headers
            </TabsTrigger>
          </TabsList>
          <CollapsibleTrigger>
            <Chevron active={isOperationToolsOpen} />
          </CollapsibleTrigger>
        </TabsAndTrigger>
        <CollapsibleContent forceMount hidden={!isOperationToolsOpen}>
          <TabsContent
            value="VariablesTab"
            forceMount
            hidden={openTab !== 'VariablesTab'}
          >
            <Variables variablesModel={variablesModel} />
          </TabsContent>
          <TabsContent value="HeadersTab">
            <Headers />
          </TabsContent>
        </CollapsibleContent>
      </TabsRoot>
    </CollapsibleRoot>
  );
};
