// components
import { HTTPHeaderControl, Tabs } from '@graphiql-prototype/ui-library';
import { MonacoEditor } from '../MonacoEditor';

// hooks
import { useHTTPHeaders } from '@graphiql-prototype/use-http-headers';

// styles
import { StyledPerTabHeaders, StyledVariablesWrap } from './styles';

const PerTabHeaders = () => {
  const { globalHeaders } = useHTTPHeaders();

  return (
    <StyledPerTabHeaders>
      <HTTPHeaderControl placement="GLOBAL" values={globalHeaders} />
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
          // panel: <MonacoEditor monacoEditorType="headers" />,
        },
      ]}
    />
  );
};
