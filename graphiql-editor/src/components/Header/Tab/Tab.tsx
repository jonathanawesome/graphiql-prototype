import { useEffect, useState } from 'react';

// components
import { Close } from '@graphiql-v2-prototype/graphiql-ui-library';

// hooks
import { useGraphiQLEditor } from '../../../hooks';

// styles
import { RemoveTabButton, TabButton, TabWrap } from './styles';

const removeEditorTab = useGraphiQLEditor.getState().removeEditorTab;
const setActiveEditorTabId = useGraphiQLEditor.getState().setActiveEditorTabId;
const switchEditorTab = useGraphiQLEditor.getState().switchEditorTab;

export const Tab = ({
  isActive,
  editorTabId,
}: {
  isActive: boolean;
  editorTabId: string;
}) => {
  const { editorTabs } = useGraphiQLEditor();

  const [tabName, setTabName] = useState<string | null>(null);

  console.log('rendering Tab', {
    // editorTabs
  });

  useEffect(() => {
    const tab = editorTabs.find((tab) => tab.editorTabId === editorTabId);
    console.log('rendering Tab, tab is changing', { editorTabs });

    if (tab?.operationDefinition?.name) {
      if (tab.operationDefinition.name.value !== tabName) {
        setTabName(tab?.operationDefinition?.name?.value);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorTabs]);

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
