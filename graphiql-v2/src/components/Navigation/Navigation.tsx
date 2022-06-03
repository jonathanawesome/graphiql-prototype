/** components */
import { Command, Docs, History, SettingsDialog } from '../index';

/** styles */
import { Controls, Links, NavigationStyled } from './styles';

export const Navigation = ({
  sidebarPlugins,
}: {
  sidebarPlugins?: React.ReactElement[];
}) => {
  return (
    <NavigationStyled>
      <Links>
        <Docs />
        <div onClick={() => alert('Todo: History?')}>
          <History />
        </div>
      </Links>

      <Controls>
        {sidebarPlugins && sidebarPlugins.map((s) => <div key={s?.toString()}>{s}</div>)}
        <div onClick={() => alert('Todo: Keyboard shortcuts')}>
          <Command />
        </div>
        <SettingsDialog />
      </Controls>
    </NavigationStyled>
  );
};
