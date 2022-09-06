// components
import { Tabs } from '@graphiql-prototype/ui-library';
import { MonacoEditor } from '../MonacoEditor';

export const OperationTools = () => {
  return (
    <Tabs
      ariaLabel="Some tab label"
      isCollapsible={true}
      tabbedContent={[
        {
          id: 'Variables',
          name: 'Variables',
          panel: <MonacoEditor monacoEditorType="variables" />,
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
