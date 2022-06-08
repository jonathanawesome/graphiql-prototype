/** hooks */
import cuid from 'cuid';
import { editor } from 'monaco-editor';
import { useEffect, useState } from 'react';
import { defaultOperation, defaultResults, defaultVariables } from '../../constants';
import { useGraphiQL } from '../../hooks';
import { getOrCreateModel } from '../../utils';
import { InlineEditor } from '../InlineEditor';

/** styles */
import {
  // Content, Root, Trigger, TriggerList,
  Wrap,
  TabButton,
  TabButtonRow,
} from './styles';

const defaultTabName = 'DEFAULT_TAB';
const defaultTabId = cuid.slug();

export const TabbedEditors = () => {
  // const [activeTab, setActiveTab] = useState<string>(defaultTabId);
  const { activeTab, setActiveTab, editors, tabs, addTab, swapEditorModels } =
    useGraphiQL();

  // const opsUri = `${tabName}-operations.graphql`;
  // const varsUri = `${tabName}-variables.json`;
  // const resultsUri = `${tabName}-results.json`;

  // const opsModel = getOrCreateModel({ uri: opsUri, value: defaultOperation });
  // const varsModel = getOrCreateModel({ uri: varsUri, value: defaultVariables });
  // const resultsModel = getOrCreateModel({ uri: resultsUri, value: defaultResults });
  const operationsModel = getOrCreateModel({
    uri: `${defaultTabId}-operations.graphql`,
    value: defaultOperation,
  });
  const variablesModel = getOrCreateModel({
    uri: `${defaultTabId}-variables.json`,
    value: defaultVariables,
  });
  const resultsModel = getOrCreateModel({
    uri: `${defaultTabId}-results.json`,
    value: defaultResults,
  });

  console.log('rendering TabbedEditors', {
    editors: editors.map((e) => e.editor.getModel()?.getValue()),
    tabs,
    activeTab,
    // operationsModel: { operationsModel, value: operationsModel.getValue() },
    // resultsModel: { resultsModel, value: resultsModel.getValue() },
  });

  useEffect(() => {
    // if (tabs.length === 0) {
    addTab({
      tab: {
        tabId: defaultTabId,
        tabName: defaultTabName,
        operationsModel,
        variablesModel,
        resultsModel,
      },
    });
    setActiveTab({ tabId: defaultTabId });

    // swapEditorModels({ tabId: defaultTabId });

    // swapEditorModels({ tabId: defaultTabId });
    // operationsEditor?.editor.setModel(operationsModel);
    // variablesEditor?.editor.setModel(variablesModel);
    // resultsEditor?.editor.setModel(resultsModel);

    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doAddTab = () => {
    const tabId = cuid.slug();
    addTab({
      tab: {
        tabId,
        tabName: tabId,
        operationsModel: getOrCreateModel({
          uri: `${tabId}-operations.graphql`,
          value: defaultOperation,
        }),
        variablesModel: getOrCreateModel({
          uri: `${tabId}-variables.json`,
          value: defaultVariables,
        }),
        resultsModel: getOrCreateModel({
          uri: `${tabId}-results.json`,
          value: defaultResults,
        }),
      },
    });
  };

  const handleTabChange = ({ tabId }: { tabId: string }) => {
    setActiveTab({ tabId });
    swapEditorModels({ tabId });
  };

  if (tabs.length === 0) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Wrap>
        <TabButtonRow>
          {tabs.map((t) => (
            <TabButton
              key={t.tabId}
              disabled={t.tabId === activeTab}
              onClick={() => handleTabChange({ tabId: t.tabId })}
              isActive={t.tabId === activeTab}
            >
              {t.tabName}
            </TabButton>
          ))}
          <button onClick={() => doAddTab()}>Add Tab</button>
        </TabButtonRow>
        <InlineEditor
          operationsModel={operationsModel}
          variablesModel={variablesModel}
          resultsModel={resultsModel}
        />
      </Wrap>
      {/* <Root
        defaultValue={tabs[0].tabId}
        onValueChange={(value) => {
          console.log('tab changing', value);
        }}
      >
        <div style={{ display: 'flex' }}>
          <TriggerList aria-label={`GraphiQL editor tabs`}>
            {tabs.map((t) => (
            <Trigger key={t.tabId} value={t.tabId}>
              {t.tabName}
            </Trigger>
          ))}
          </TriggerList>
          <button onClick={() => doAddTab()}>Add Tab</button>
        </div>
        {tabs.map((t) => (
          <Content key={t.tabId} value={t.tabId}>
            <InlineEditor tabId={t.tabId} />
          </Content>
        ))}
      </Root> */}
    </>
  );
};
