// components
import {
  Button,
  // , Tag
} from '@graphiql-prototype/ui-library';

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
    <div className={StyledAddTabButtonWrap()}>
      <Button
        action={() => initEditorTab({})}
        icon="Plus"
        label={`Add new editor tab`}
        size="SMALL"
        style="ICON"
      />
    </div>
  );
};

export const EditorTabs = () => {
  const editorTabs = useEditor((state) => state.editorTabs);
  const activeEditorTabId = useEditor((state) => state.activeEditorTabId);

  const showRemoveTabButton = editorTabs.length > 1;

  const handleTabChange = ({ editorTabId }: { editorTabId: string }) => {
    setActiveEditorTabId({ editorTabId });
    switchEditorTab({ editorTabId });
  };

  const doRemoveTab = ({ editorTabId }: { editorTabId: string }) => {
    removeEditorTab({ editorTabId });
  };

  return (
    <div className={StyledEditorTabs()}>
      {editorTabs.map((tab) => {
        return (
          <div
            key={tab.editorTabId}
            className={StyledTabWrap({ isActive: activeEditorTabId === tab.editorTabId })}
          >
            {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */}
            <div
              className={StyledTabButton({ hasRemoveTabButton: showRemoveTabButton })}
              onClick={() => handleTabChange({ editorTabId: tab.editorTabId })}
            >
              {/* <Tag
                copy={tab.operationDefinition?.operation.charAt(0).toUpperCase() || '?'}
                title={tab.operationDefinition?.operation || 'Operation not set'}
                type="OPERATION"
              /> */}
              {tab.editorTabName}
            </div>
            {showRemoveTabButton && (
              <div className={StyledRemoveTabButtonWrap()}>
                <Button
                  action={() => doRemoveTab({ editorTabId: tab.editorTabId })}
                  icon="Close"
                  label={`Remove tab`}
                  size="SMALL"
                  style="ICON"
                />
              </div>
            )}
          </div>
        );
      })}
      <AddTabButton />
    </div>
  );
};
