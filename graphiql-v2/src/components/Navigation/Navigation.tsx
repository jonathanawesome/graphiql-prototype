/** components */
import { SettingsDialog } from '../index';
import { Command, Docs, History } from '../../icons';

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
        <div style={{ cursor: 'not-allowed' }}>
          <History />
        </div>
      </PanePlugins>

      <SibebarPlugins>
        {sidebarPlugins && sidebarPlugins.map((s) => <div key={s?.toString()}>{s}</div>)}
        <div style={{ cursor: 'not-allowed' }}>
          <Command />
        </div>
        <SettingsDialog />
      </SibebarPlugins>
    </NavigationStyled>
  );
};
