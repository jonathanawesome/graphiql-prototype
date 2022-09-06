import { useEffect, useState } from 'react';

// components
import { Close } from '@graphiql-prototype/ui-library';

// hooks
import { EditorTab, useEditor } from '@graphiql-prototype/use-editor';

// styles
import { RemoveTabButton, TabButton, TabWrap } from './styles';

const removeEditorTab = useEditor.getState().removeEditorTab;
const setActiveEditorTabId = useEditor.getState().setActiveEditorTabId;
const switchEditorTab = useEditor.getState().switchEditorTab;

export const Tab = ({
  isActive,
  editorTabId,
}: {
  isActive: boolean;
  editorTabId: string;
}) => {
  const { editorTabs } = useEditor();

  const [tab, setTab] = useState<EditorTab | null>(null);

  useEffect(() => {
    const tab = editorTabs.find((tab) => tab.editorTabId === editorTabId);
    // console.log('rendering Tab', {
    //   tab,
    // });

    if (tab) {
      setTab(tab);
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
    <TabWrap>
      <TabButton disabled={!!isActive} onClick={() => handleTabChange()}>
        {tab?.operationDefinition?.name?.value || tab?.editorTabName}
      </TabButton>

      {isActive && (
        <RemoveTabButton aria-label="Remove Tab" onClick={() => doRemoveTab(editorTabId)}>
          <Close />
        </RemoveTabButton>
      )}
    </TabWrap>
  );
};
