/** components */
import { Gear } from '../icons';
import { SidebarDialog } from '../SidebarDialog';

export const SettingsDialog = () => {
  return <SidebarDialog icon={<Gear />} content={<>Settings!!!</>} title="Settings" />;
};
