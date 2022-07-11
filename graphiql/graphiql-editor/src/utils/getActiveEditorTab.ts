import { useGraphiQLEditor } from '../hooks';

export const getActiveEditorTab = () => {
  const activeEditorTabId = useGraphiQLEditor.getState().activeEditorTabId;
  const editorTabs = useGraphiQLEditor.getState().editorTabs;
  return editorTabs.find((editorTab) => editorTab.editorTabId === activeEditorTabId);
};
