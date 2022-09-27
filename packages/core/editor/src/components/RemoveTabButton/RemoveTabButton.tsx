// components
import { Close } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';

// styles
import { RemoveTabButtonStyled } from './styles';

const removeEditorTab = useEditor.getState().removeEditorTab;

export const RemoveTabButton = ({ editorTabId }: { editorTabId: string }) => {
  const doRemoveTab = (editorTabId: string) => {
    removeEditorTab({ editorTabId });
  };

  return (
    <RemoveTabButtonStyled
      aria-label="Remove Tab"
      onClick={() => doRemoveTab(editorTabId)}
    >
      <Close />
    </RemoveTabButtonStyled>
  );
};
