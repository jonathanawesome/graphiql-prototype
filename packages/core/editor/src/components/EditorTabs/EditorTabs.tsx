// components
import { Close, Plus } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';

// styles
import {
  StyledAddTabButton,
  StyledEditorTabs,
  StyledRemoveTabButton,
  TabButton,
  TabWrap,
} from './styles';

const removeEditorTab = useEditor.getState().removeEditorTab;
const setActiveEditorTabId = useEditor.getState().setActiveEditorTabId;
const switchEditorTab = useEditor.getState().switchEditorTab;

const AddTabButton = () => {
  const { initEditorTab } = useEditor();
  return (
    <StyledAddTabButton onClick={() => initEditorTab()}>
      <Plus />
    </StyledAddTabButton>
  );
};

export const EditorTabs = () => {
  const { activeEditorTabId, editorTabs } = useEditor();

  const handleTabChange = ({ editorTabId }: { editorTabId: string }) => {
    setActiveEditorTabId({ editorTabId });
    switchEditorTab({ editorTabId });
  };

  const doRemoveTab = ({ editorTabId }: { editorTabId: string }) => {
    removeEditorTab({ editorTabId });
  };

  const showRemoveTabButton = editorTabs.length > 1;

  return (
    <StyledEditorTabs>
      {editorTabs.map((tab) => (
        <TabWrap key={tab.editorTabId} isActive={activeEditorTabId === tab.editorTabId}>
          <TabButton
            hasRemoveTabButton={showRemoveTabButton}
            onClick={() => handleTabChange({ editorTabId: tab.editorTabId })}
          >
            {tab?.operationDefinition?.name?.value || tab?.editorTabName}
          </TabButton>
          {showRemoveTabButton && (
            <StyledRemoveTabButton
              aria-label="Remove Tab"
              onClick={() => doRemoveTab({ editorTabId: tab.editorTabId })}
            >
              <Close />
            </StyledRemoveTabButton>
          )}
        </TabWrap>
      ))}
      <AddTabButton />
    </StyledEditorTabs>
  );
};
