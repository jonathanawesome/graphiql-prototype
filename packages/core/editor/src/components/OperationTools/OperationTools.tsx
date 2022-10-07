// components
import { HTTPHeaderControl, Message, Tabs } from '@graphiql-prototype/ui-library';
import { MonacoEditor } from '../MonacoEditor';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// styles
import { StyledPerTabHeaders, StyledVariablesWrap } from './styles';

const PerTabHeaders = () => {
  const activeEditorTab = useEditor().getActiveTab();

  if (!activeEditorTab?.headers) {
    return null;
  }

  return (
    <StyledPerTabHeaders>
      <Message
        message={
          <>
            Headers defined and enabled here will override any global headers that use the
            same key.
          </>
        }
        variant="INFO"
      />
      <HTTPHeaderControl placement="ACTIVE_TAB" values={activeEditorTab.headers} />
    </StyledPerTabHeaders>
  );
};

export const OperationTools = () => {
  return (
    <Tabs
      ariaLabel="Some tab label"
      isCollapsible={true}
      tabbedContent={[
        {
          id: 'Variables',
          name: 'Variables',
          panel: (
            <StyledVariablesWrap>
              <MonacoEditor monacoEditorType="variables" />
            </StyledVariablesWrap>
          ),
        },
        {
          id: 'Headers',
          name: 'Headers',
          panel: <PerTabHeaders />,
        },
      ]}
    />
  );
};
