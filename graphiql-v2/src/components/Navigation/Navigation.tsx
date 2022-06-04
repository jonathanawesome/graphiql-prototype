/** components */
import { Command, Docs, History, SettingsDialog } from '../index';

/** styles */
import { PanePlugins, SibebarPlugins, NavigationStyled } from './styles';

export const Navigation = ({
  sidebarPlugins,
}: {
  sidebarPlugins?: React.ReactElement[];
}) => {
  return (
    <NavigationStyled>
      <PanePlugins>
        <Docs />
        <div onClick={() => alert('Todo: History?')}>
          <History />
        </div>
      </PanePlugins>

      <SibebarPlugins>
        {sidebarPlugins && sidebarPlugins.map((s) => <div key={s?.toString()}>{s}</div>)}
        <div onClick={() => alert('Todo: Keyboard shortcuts')}>
          <Command />
        </div>
        <SettingsDialog />
      </SibebarPlugins>
    </NavigationStyled>
  );
};
