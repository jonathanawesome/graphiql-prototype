import { useEffect, useState } from 'react';

/** components */
import { Close } from '@graphiql-v2-prototype/graphiql-ui-library';

/** hooks */
import { useGraphiQLEditor } from '../../../hooks';

/** styles */
import { RemoveTabButton, TabButton, TabWrap } from './styles';

export const Tab = ({
  isActive,
  editorTabId,
}: {
  isActive: boolean;
  editorTabId: string;
}) => {
  const { editorTabs, removeEditorTab, setActiveEditorTabId, switchEditorTab } =
    useGraphiQLEditor();

  const [tabName, setTabName] = useState<string | null>(null);

  // console.log('rendering Tab', { editorTabs });

  const tab = editorTabs.find((tab) => tab.editorTabId === editorTabId);

  useEffect(() => {
    if (tab?.operationDefinition?.name) {
      if (tab.operationDefinition.name.value !== tabName) {
        setTabName(tab?.operationDefinition?.name?.value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const handleTabChange = () => {
    setActiveEditorTabId({ editorTabId });
    switchEditorTab({ editorTabId });
  };

  const doRemoveTab = (editorTabId: string) => {
    removeEditorTab({ editorTabId });
  };

  return (
    <TabWrap isActive={isActive}>
      <TabButton
        disabled={!!isActive}
        onClick={() => handleTabChange()}
        isActive={isActive}
      >
        {tabName || `<untitled>`}
      </TabButton>

      {isActive && (
        <RemoveTabButton aria-label="Remove Tab" onClick={() => doRemoveTab(editorTabId)}>
          <Close />
        </RemoveTabButton>
      )}
    </TabWrap>
  );
};
