/** components */
import { Command, Docs, Gear, History } from '@/components';

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
        <div onClick={() => alert('Todo: Settings')}>
          <Gear />
        </div>
      </Controls>
    </NavigationStyled>
  );
};
