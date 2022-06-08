import { useEffect, useState } from 'react';
import { Chevron } from '@graphiql-v2-prototype/graphiql-ui-library';

/** components */
// import { Chevron } from '../../../icons';
// import { Editor } from '../Editor';

/** constants */
// import { defaultVariables } from '../../../constants';

/** hooks */
// import { useGraphiQL } from '../../../../graphiql-v2/src/hooks/useGraphiQL/useGraphiQL';
import { useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

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
import { Editor } from '../Editor';
import { editor } from 'monaco-editor';
// import { EasyVars } from '../EasyVars';
// import { parseEasyVars } from '../../../utils';

const Headers = () => {
  return <span style={{ fontSize: '10px' }}>TODO: Headers...please send help 🦺</span>;
};

export const CollectTools = ({
  setHeight,
  variablesModel,
}: {
  setHeight: () => void;
  variablesModel: editor.ITextModel;
}) => {
  const [isVariablesOpen, setIsVariablesOpen] = useState<boolean>(false);

  const {
    operationDefinition,
    // operationAction,
    variables,
  } = useGraphiQL();

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
          <TabsContent value="tab2">
            <VariablesEditor>
              <Editor editorType="variables" initWithModel={variablesModel} />
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
