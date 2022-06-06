/** components */
import { PlayButton } from '../PlayButton';
import { PrettierButton } from '../PrettierButton';

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
