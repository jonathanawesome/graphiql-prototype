// components
import { HTTPHeaderControl, Tabs } from '@graphiql-prototype/ui-library';
import { MonacoEditor } from '../MonacoEditor';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';

// styles
import { StyledPerTabHeaders, StyledVariablesWrap } from './styles';

const PerTabHeaders = () => {
  const activeEditorTab = useEditor().getActiveTab();

  if (!activeEditorTab?.headers) {
    return null;
  }

  return (
    <StyledPerTabHeaders>
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
