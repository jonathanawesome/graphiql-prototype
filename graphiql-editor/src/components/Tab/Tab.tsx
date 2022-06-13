/** components */
import { Close } from '@graphiql-v2-prototype/graphiql-ui-library';

/** hooks */
import { useGraphiQLEditor } from '../../hooks';

/** styles */
import { RemoveTabButton, TabButton, TabWrap } from './styles';

export const Tab = ({
  isActive,
  editorTabId,
}: {
  isActive: boolean;
  editorTabId: string;
}) => {
  const { editorTabs, removeEditorTab, setActiveEditorTabId, swapEditorTab } =
    useGraphiQLEditor();

  const tab = editorTabs.find((tab) => tab.editorTabId === editorTabId);
  const name = tab?.operationDefinition?.name;

  // console.log('rendering Tab', { tab, name });

  const handleTabChange = () => {
    setActiveEditorTabId({ editorTabId });
    swapEditorTab({ editorTabId });
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
        {name?.value || `<untitled>`}
      </TabButton>

      {isActive && (
        <RemoveTabButton aria-label="Remove Tab" onClick={() => doRemoveTab(editorTabId)}>
          <Close />
        </RemoveTabButton>
      )}
    </TabWrap>
  );
};
