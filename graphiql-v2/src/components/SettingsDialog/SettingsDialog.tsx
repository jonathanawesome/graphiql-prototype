import { styled } from '../../theme';

/** components */
import { Gear } from '../../icons';
import { SidebarDialog } from '../SidebarDialog';

const StyledSettingsDialogContent = styled('div', {
  fontSize: 10,
});

export const SettingsDialog = () => {
  return (
    <SidebarDialog
      icon={<Gear />}
      content={
        <StyledSettingsDialogContent>
          There's nothing here except an example of a sidebar dialog. 👈 Try the GraphQL
          icon.
        </StyledSettingsDialogContent>
      }
      title="Settings"
    />
  );
};
