import { useState } from 'react';

/** components */
import { Chevron, Editor } from '../index';

/** constants */
import { defaultVariables } from '../../constants';

/** hooks */
import { useGraphiQL } from '../../hooks';

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

export const VariablesAndHeaders = ({ setHeight }: { setHeight: () => void }) => {
  const [isVariablesOpen, setIsVariablesOpen] = useState<boolean>(false);

  const { operationDefinition, operationAction, variables, setVariables } = useGraphiQL();

  const variablesCount = operationDefinition?.variableDefinitions?.length || 0;

  const handleOpenChange = () => {
    setIsVariablesOpen(!isVariablesOpen);
    setTimeout(() => {
      //TODO: trigger editor.layout() to resize the editor
      setHeight();
    }, 150);
  };

  return (
    <CollapsibleRoot open={isVariablesOpen} onOpenChange={handleOpenChange}>
      <TabsRoot defaultValue="tab1">
        <TabsAndTrigger>
          <TabsList aria-label="Manage your account">
            <TabsTrigger
              value="tab1"
              onClick={() => setIsVariablesOpen(!isVariablesOpen)}
            >
              Variables {variablesCount > 0 && <span>{variablesCount}</span>}
            </TabsTrigger>
            <TabsTrigger
              value="tab2"
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
          </TabsContent>
          <TabsContent value="tab2">TODO: Headers</TabsContent>
        </CollapsibleContent>
      </TabsRoot>
    </CollapsibleRoot>
  );
};
