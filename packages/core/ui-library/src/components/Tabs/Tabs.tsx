import { useEffect, useState } from 'react';
// import type { Dispatch, MouseEvent, SetStateAction } from 'react';

// components
// import { ChevronLarge } from '../../icons';
import { TabsList } from './TabsList';
import { TabPanels } from './TabPanels';

// styles
import {
  // StyledCollapsibleContent,
  // StyledCollapsibleRoot,
  // StyledCollapsibleTrigger,
  // StyledTabsRoot,
  StyledTabs,
} from './styles';

// types
import { TabsProps } from './types';

// const NotCollapsible = ({
//   ariaLabel,
//   selectedTab,
//   setSelectedTab,
//   doRemoveTab,
//   tabbedContent,
// }: TabsProps & {
//   selectedTab: string;
//   setSelectedTab: Dispatch<SetStateAction<string>>;
// }) => {
//   return (
//     <StyledTabsRoot value={selectedTab} onValueChange={(value) => setSelectedTab(value)}>
//       <TabsList
//         ariaLabel={ariaLabel}
//         doRemoveTab={doRemoveTab}
//         setSelectedTab={setSelectedTab}
//         tabbedContent={tabbedContent}
//       />
//       <TabPanels selectedTab={selectedTab} tabbedContent={tabbedContent} />
//     </StyledTabsRoot>
//   );
// };

// const Collapsible = ({
//   ariaLabel,
//   selectedTab,
//   setSelectedTab,
//   doRemoveTab,
//   tabbedContent,
// }: TabsProps & {
//   selectedTab: string;
//   setSelectedTab: Dispatch<SetStateAction<string>>;
// }) => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   const handleCollapseOnClick = ({ event }: { event: MouseEvent }) => {
//     const targetValue = event.currentTarget.getAttribute('data-value');
//     // console.log('handleCollapseOnClick', {
//     //   selectedTab,
//     //   targetValue,
//     // });
//     if (selectedTab === targetValue && isOpen) {
//       setIsOpen(false);
//     }
//     if (selectedTab === targetValue && !isOpen) {
//       setIsOpen(true);
//     }
//     if (selectedTab !== targetValue && !isOpen) {
//       setIsOpen(true);
//     }
//   };

//   return (
//     <StyledCollapsibleRoot
//       open={isOpen}
//       onOpenChange={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
//     >
//       <StyledTabsRoot
//         value={selectedTab}
//         onValueChange={(value) => setSelectedTab(value)}
//       >
//         <TabsList
//           ariaLabel={ariaLabel}
//           doRemoveTab={doRemoveTab}
//           handleCollapseOnClick={handleCollapseOnClick}
//           isCollapsible={true}
//           setSelectedTab={setSelectedTab}
//           tabbedContent={tabbedContent}
//         />
//         <StyledCollapsibleTrigger isOpen={isOpen}>
//           <ChevronLarge />
//         </StyledCollapsibleTrigger>
//         <StyledCollapsibleContent forceMount hidden={!isOpen}>
//           <TabPanels selectedTab={selectedTab} tabbedContent={tabbedContent} />
//         </StyledCollapsibleContent>
//       </StyledTabsRoot>
//     </StyledCollapsibleRoot>
//   );
// };

export const Tabs = ({
  initialSelectedTab,
  ariaLabel,
  doRemoveTab,
  isCollapsible = false,
  tabbedContent,
}: TabsProps) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    initialSelectedTab || tabbedContent[0].tabId
  );
  // console.log('Tabs', { selectedTab, initialSelectedTab });

  useEffect(() => {
    setSelectedTab(initialSelectedTab || tabbedContent[0].tabId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSelectedTab]);

  return (
    <StyledTabs>
      <TabsList
        ariaLabel={ariaLabel}
        doRemoveTab={doRemoveTab}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        tabbedContent={tabbedContent}
      />
      <TabPanels selectedTab={selectedTab} tabbedContent={tabbedContent} />
    </StyledTabs>
  );

  // if (isCollapsible) {
  //   return (
  //     <Collapsible
  //       ariaLabel={ariaLabel}
  //       selectedTab={selectedTab}
  //       setSelectedTab={setSelectedTab}
  //       doRemoveTab={doRemoveTab}
  //       tabbedContent={tabbedContent}
  //     />
  //   );
  // }
  // return (
  //   <NotCollapsible
  //     ariaLabel={ariaLabel}
  //     selectedTab={selectedTab}
  //     setSelectedTab={setSelectedTab}
  //     doRemoveTab={doRemoveTab}
  //     tabbedContent={tabbedContent}
  //   />
  // );
};
