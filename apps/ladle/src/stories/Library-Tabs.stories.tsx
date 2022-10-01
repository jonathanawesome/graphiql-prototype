import { useState } from 'react';

// ladle helper components
import { FlexCol } from '../components/FlexCol';
import { FlexRow } from '../components/FlexRow';

import { TabsProps, Tabs } from '@graphiql-prototype/ui-library';

export const TabsStory = () => {
  const [tabs, setTabs] = useState<TabsProps['tabbedContent']>([
    {
      id: 'One',
      name: 'Tab One',
      panel: <div>I'm the panel for tab one</div>,
    },
    {
      id: 'Two',
      name: 'Tab Two',
      panel: <div>I'm the panel for tab two</div>,
    },
    {
      id: 'Three',
      name: 'Tab Three',
      panel: <div>I'm the panel for tab three</div>,
    },
  ]);

  const doRemoveTab = ({ tabId }: { tabId: string }) =>
    setTabs((tabs) => tabs.filter((t) => t.id !== tabId));
  return (
    <FlexCol>
      <FlexRow name="removable tabs">
        <Tabs ariaLabel="Some tab label" doRemoveTab={doRemoveTab} tabbedContent={tabs} />
      </FlexRow>

      <FlexRow name="removable/forceMount tabs">
        <Tabs ariaLabel="Some tab label" doRemoveTab={doRemoveTab} tabbedContent={tabs} />
      </FlexRow>

      <FlexRow name="non removable tabs / not Collapsible">
        <Tabs
          ariaLabel="Some tab label"
          tabbedContent={[
            {
              id: 'One',
              name: 'Tab One',
              panel: <div>I'm the panel for tab one</div>,
            },
            {
              id: 'Two',
              name: 'Tab Two',
              panel: <div>I'm the panel for tab two</div>,
            },
            {
              id: 'Three',
              name: 'Tab Three',
              panel: <div>I'm the panel for tab three</div>,
            },
          ]}
        />
      </FlexRow>
      <FlexRow name="non removable tabs / isCollapsible">
        <Tabs
          ariaLabel="Some tab label"
          isCollapsible={true}
          tabbedContent={[
            {
              id: 'One',
              name: 'Tab One',
              panel: <div>I'm the panel for tab one</div>,
            },
            {
              id: 'Two',
              name: 'Tab Two',
              panel: <div>I'm the panel for tab two</div>,
            },
            {
              id: 'Three',
              name: 'Tab Three',
              panel: <div>I'm the panel for tab three</div>,
            },
          ]}
        />
      </FlexRow>

      <FlexRow name="non removable tabs / forceMount / isCollapsible">
        <Tabs
          ariaLabel="Some tab label"
          isCollapsible={true}
          tabbedContent={[
            {
              id: 'One',
              name: 'Tab One',
              panel: <div>I'm the panel for tab one</div>,
            },
            {
              id: 'Two',
              name: 'Tab Two',
              panel: <div>I'm the panel for tab two</div>,
            },
            {
              id: 'Three',
              name: 'Tab Three',
              panel: <div>I'm the panel for tab three</div>,
            },
          ]}
        />
      </FlexRow>
    </FlexCol>
  );
};
