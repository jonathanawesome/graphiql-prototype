/** components */
import { PlayButton, PrettierButton } from '@/components';

import { EditorActionsStyled } from './styles';

export const EditorActions = () => {
  return (
    <EditorActionsStyled>
      <PlayButton />
      <PrettierButton />
    </EditorActionsStyled>
  );
};
