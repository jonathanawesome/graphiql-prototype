/** components */
import { PlayButton, PrettierButton } from '../index';

/** styles */
import { EditorActionsStyled } from './styles';

export const EditorActions = () => {
  return (
    <EditorActionsStyled>
      <PlayButton />
      <PrettierButton />
    </EditorActionsStyled>
  );
};
