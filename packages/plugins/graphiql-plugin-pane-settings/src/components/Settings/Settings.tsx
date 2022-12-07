// components
import { Icon } from '@graphiql-prototype/ui-library';

// hooks
import { useTheme } from '@graphiql-prototype/ui-library';

// styles
import {
  StyledSettingsWrap,
  // StyledSettingsContent,
  // StyledThemeSwitch,
  // StyledThemeSwitchButton,
  // StyledIcon,
} from './styles';

export const Settings = () => {
  const { themeMode, toggleThemeMode } = useTheme();

  return (
    <div className={StyledSettingsWrap()}>
      <div className="plugin-settings-content">
        <div className="plugin-settings-theme-switch">
          <span>Switch theme</span>

          <button
            onClick={() => {
              if (themeMode === 'LIGHT') {
                toggleThemeMode({ mode: 'DARK' });
              }
              if (themeMode === 'DARK') {
                toggleThemeMode({ mode: 'LIGHT' });
              }
            }}
          >
            <div className="plugin-settings-icon-wrap">
              <Icon name="Light" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
