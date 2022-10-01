// components
import { Icon } from '@graphiql-prototype/ui-library';

// hooks
import { useTheme } from '@graphiql-prototype/ui-library';

// styles
import {
  StyledSettingsWrap,
  StyledSettingsContent,
  StyledThemeSwitch,
  StyledThemeSwitchButton,
  StyledIcon,
} from './styles';

export const Settings = () => {
  const { themeMode, toggleThemeMode } = useTheme();

  return (
    <StyledSettingsWrap>
      <StyledSettingsContent>
        <StyledThemeSwitch>
          <span>Switch theme</span>

          <StyledThemeSwitchButton
            onClick={() => {
              if (themeMode === 'LIGHT') {
                toggleThemeMode({ mode: 'DARK' });
              }
              if (themeMode === 'DARK') {
                toggleThemeMode({ mode: 'LIGHT' });
              }
            }}
          >
            <StyledIcon>
              <Icon name="Light" />
            </StyledIcon>
          </StyledThemeSwitchButton>
        </StyledThemeSwitch>
      </StyledSettingsContent>
    </StyledSettingsWrap>
  );
};
