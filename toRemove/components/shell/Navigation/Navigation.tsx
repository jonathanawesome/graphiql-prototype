/** components */
import { Command, Docs, History } from '@/components';
import { SettingsDialog } from '../SettingsDialog';

/** styles */
import { Controls, Links, NavigationStyled } from './styles';

export const Navigation = () => {
  return (
    <NavigationStyled>
      <Links>
        <Docs />
        <div onClick={() => alert('Todo: History?')}>
          <History />
        </div>
      </Links>

      <Controls>
        <div onClick={() => alert('Todo: Keyboard shortcuts')}>
          <Command />
        </div>
        <SettingsDialog />
      </Controls>
    </NavigationStyled>
  );
};
