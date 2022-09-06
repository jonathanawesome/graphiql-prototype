import {
  AddTabButton,
  OperationTools,
  RemoveTabButton,
  Tabs,
  Tab,
} from '@graphiql-prototype/editor';

import { useEditor } from '@graphiql-prototype/use-editor';

export const AddTabButtonStory = () => {
  return <AddTabButton />;
};
AddTabButtonStory.storyName = 'Add Tab Button';

export const RemoveTabButtonStory = () => {
  const activeTabId = useEditor().getActiveTab()?.editorTabId;
  return <RemoveTabButton editorTabId={activeTabId as string} />;
};
RemoveTabButtonStory.storyName = 'Remove Tab Button';

export const TabsStory = () => {
  return <Tabs />;
};

TabsStory.storyName = 'Tabs';

export const ActiveTab = () => {
  const activeTabId = useEditor().getActiveTab()?.editorTabId;
  return <Tab editorTabId={activeTabId as string} isActive={true} />;
};

export const DefaultTab = () => {
  const activeTabId = useEditor().getActiveTab()?.editorTabId;
  return <Tab editorTabId={activeTabId as string} isActive={false} />;
};

export const OperationsToolsTesting = () => {
  return <OperationTools />;
};
