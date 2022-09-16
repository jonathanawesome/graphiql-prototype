// components
import { Tabs } from '@graphiql-prototype/ui-library';
import { MonacoEditor } from '../MonacoEditor';

// styles
import { StyledVariablesWrap } from './styles';

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
          panel: <MonacoEditor monacoEditorType="headers" />,
        },
      ]}
    />
  );
};
