// components
import { HTTPHeaderControl, Message, Tabs } from '@graphiql-prototype/ui-library';
import { MonacoEditor } from '../MonacoEditor';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// styles
import { StyledPerTabHeaders, StyledVariablesWrap } from './styles';

const PerTabHeaders = () => {
  const activeTab = useEditor((state) => state.getActiveTab());

  return (
    <div className={StyledPerTabHeaders()}>
      <Message
        message={
          <>
            Headers defined and enabled here will override any global headers that use the
            same key.
          </>
        }
        variant="INFO"
      />
      {activeTab && (
        <HTTPHeaderControl placement="ACTIVE_TAB" values={activeTab.headers} />
      )}
    </div>
  );
};

export const OperationTools = () => {
  return (
    <Tabs
      ariaLabel="Some tab label"
      isCollapsible={true}
      initialSelectedTab="variables"
      tabbedContent={[
        {
          name: 'Variables',
          panel: (
            <div className={StyledVariablesWrap()}>
              <MonacoEditor monacoEditorType="variables" />
            </div>
          ),
          panelId: 'variables',
          tabId: 'variables',
        },
        {
          name: 'Headers',
          panel: <PerTabHeaders />,
          panelId: 'headers',
          tabId: 'headers',
        },
      ]}
    />
  );
};
