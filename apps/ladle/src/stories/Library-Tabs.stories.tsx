import { TabsProps, Tabs, styled } from '@graphiql-prototype/ui-library';
import { useState } from 'react';

const FlexRow = styled('div', {
  display: 'flex',
  gap: 24,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  width: '100%',
});

const FlexCol = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  color: 'orange',
});

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
      <FlexRow>
        <span>removable tabs</span>
        <Tabs ariaLabel="Some tab label" doRemoveTab={doRemoveTab} tabbedContent={tabs} />
      </FlexRow>

      <FlexRow>
        <span>removable/forceMount tabs</span>
        <Tabs ariaLabel="Some tab label" doRemoveTab={doRemoveTab} tabbedContent={tabs} />
      </FlexRow>

      <FlexRow>
        <span>non removable tabs / not Collapsible</span>
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
      <FlexRow>
        <span>non removable tabs / isCollapsible</span>
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

      <FlexRow>
        <span>non removable tabs / forceMount / isCollapsible</span>
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

// export const NonRemovableTabs = () => {
//   return (
//     <Tabs
//       ariaLabel="Some tab label"
//       tabbedContent={[
//         {
//           id: 'One',
//           name: 'Tab One',
//           panel: <div>I'm the panel for tab one</div>,
//         },
//         {
//           id: 'Two',
//           name: 'Tab Two',
//           panel: <div>I'm the panel for tab two</div>,
//         },
//         {
//           id: 'Three',
//           name: 'Tab Three',
//           panel: <div>I'm the panel for tab three</div>,
//         },
//       ]}
//     />
//   );
// };

// export const RemovableTabs = () => {
//   const [tabs, setTabs] = useState<TabsProps['tabbedContent']>([
//     {
//       id: 'One',
//       name: 'Tab One',
//       panel: <div>I'm the panel for tab one</div>,
//     },
//     {
//       id: 'Two',
//       name: 'Tab Two',
//       panel: <div>I'm the panel for tab two</div>,
//     },
//     {
//       id: 'Three',
//       name: 'Tab Three',
//       panel: <div>I'm the panel for tab three</div>,
//     },
//   ]);

//   const doRemoveTab = ({ tabId }: { tabId: string }) =>
//     setTabs((tabs) => tabs.filter((t) => t.id !== tabId));

//   return (
//     <Tabs ariaLabel="Some tab label" doRemoveTab={doRemoveTab} tabbedContent={tabs} />
//   );
// };
