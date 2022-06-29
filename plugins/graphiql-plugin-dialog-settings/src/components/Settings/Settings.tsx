// components
import { GlobalHeaders } from '../GlobalHeaders/GlobalHeaders';

// styles
import { StyledSettingsDialogContent, SettingsItem, SettingsItemLead } from './styles';

export const Settings = () => {
  return (
    <StyledSettingsDialogContent>
      <GlobalHeaders />
      <SettingsItem>
        <SettingsItemLead>
          <span>Theme</span>
          <p>😉</p>
        </SettingsItemLead>
      </SettingsItem>
    </StyledSettingsDialogContent>
  );
};
