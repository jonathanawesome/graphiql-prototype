// components
import { Plus } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';

// styles
import { AddTabButtonStyled } from './styles';

export const AddTabButton = () => {
  const { initEditorTab } = useEditor();
  return (
    <AddTabButtonStyled onClick={() => initEditorTab()}>
      <Plus />
    </AddTabButtonStyled>
  );
};
