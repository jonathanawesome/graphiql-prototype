import { useEffect, useState } from 'react';

/** components */
import { Chevron } from '../../icons';
import { Editor } from '../Editor';

/** constants */
import { defaultVariables } from '../../../constants';

/** hooks */
import { useGraphiQL } from '../../../hooks';

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
import { EasyVars } from '../EasyVars';

const Headers = () => {
  return <span style={{ fontSize: '10px' }}>TODO: Headers...please send help 🦺</span>;
};

export const VariablesAndHeaders = ({
  setHeight,
  varsUri,
}: {
  setHeight: () => void;
  varsUri: string;
}) => {
  const [isVariablesOpen, setIsVariablesOpen] = useState<boolean>(false);

  const { operationDefinition, operationAction, variables } = useGraphiQL();

  const variablesCount = operationDefinition?.variableDefinitions?.length || 0;

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
            <EasyVars easyVars={variables} />

            {/* <VariablesEditor>
              <Editor
                action={operationAction()}
                defaultValue={defaultVariables}
                language="json"
                hashedUri={varsUri}
                value={variables}
                valueSetter={setVariables}
              />
            </VariablesEditor> */}
          </TabsContent>
          <TabsContent value="tab2">
            <Headers />
          </TabsContent>
        </CollapsibleContent>
      </TabsRoot>
    </CollapsibleRoot>
  );
};
