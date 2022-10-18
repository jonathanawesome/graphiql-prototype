// components
import { Button, Tag } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/store';

// styles
import {
  StyledAddTabButtonWrap,
  StyledEditorTabs,
  StyledRemoveTabButtonWrap,
  StyledTabButton,
  StyledTabWrap,
} from './styles';

const removeEditorTab = useEditor.getState().removeEditorTab;
const setActiveEditorTabId = useEditor.getState().setActiveEditorTabId;
const switchEditorTab = useEditor.getState().switchEditorTab;

const AddTabButton = () => {
  const { initEditorTab } = useEditor();
  return (
    <StyledAddTabButtonWrap>
      <Button
        action={() => initEditorTab({})}
        icon="Plus"
        label={`Add new editor tab`}
        size="SMALL"
        style="ICON"
      />
    </StyledAddTabButtonWrap>
  );
};

export const EditorTabs = () => {
  const { activeEditorTabId, editorTabs } = useEditor();

  // console.log('editortabs', { editorTabs });

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
      {editorTabs.map((tab) => {
        return (
          <StyledTabWrap
            key={tab.editorTabId}
            isActive={activeEditorTabId === tab.editorTabId}
          >
            <StyledTabButton
              hasRemoveTabButton={showRemoveTabButton}
              onClick={() => handleTabChange({ editorTabId: tab.editorTabId })}
            >
              <Tag
                copy={tab.operationDefinition?.operation.charAt(0).toUpperCase() || '?'}
                title={tab.operationDefinition?.operation || 'Operation not set'}
                type="OPERATION"
              />
              {tab?.operationDefinition?.name?.value || tab?.editorTabName}
            </StyledTabButton>
            {showRemoveTabButton && (
              <StyledRemoveTabButtonWrap>
                <Button
                  action={() => doRemoveTab({ editorTabId: tab.editorTabId })}
                  icon="Close"
                  label={`Remove tab`}
                  size="SMALL"
                  style="ICON"
                />
              </StyledRemoveTabButtonWrap>
            )}
          </StyledTabWrap>
        );
      })}
      <AddTabButton />
    </StyledEditorTabs>
  );
};
