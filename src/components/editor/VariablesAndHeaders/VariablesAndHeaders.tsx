import { useState } from 'react';

/** components */
import { Chevron, Editor } from '@/components';

/** constants */
import { defaultVariables } from '@/constants';

/** hooks */
import { useGraphiQL } from '@/hooks';

/** styles */
import {
  CollapsibleContent,
  CollapsibleRoot,
  TabsAndTrigger,
  CollapsibleTrigger,
  VariablesEditor,
  TabsRoot,
  TabsTrigger,
  TabsList,
  TabsContent,
} from './styles';

export const VariablesAndHeaders = ({ setHeight }: { setHeight: () => void }) => {
  const [isVariablesOpen, setIsVariablesOpen] = useState<boolean>(false);

  const { operationAction, variables, setVariables } = useGraphiQL();

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
            <TabsTrigger value="tab1">Variables</TabsTrigger>
            <TabsTrigger value="tab2">Headers</TabsTrigger>
          </TabsList>
          <CollapsibleTrigger>
            <div style={{ transform: isVariablesOpen ? undefined : 'rotate(180deg)' }}>
              <Chevron />
            </div>
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
          <TabsContent value="tab2">Headers</TabsContent>
        </CollapsibleContent>
      </TabsRoot>
    </CollapsibleRoot>
  );
};
