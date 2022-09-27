import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledSettingsWrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.space[6],
  height: '100%',
});

export const StyledSettingsContent = styled('div', {
  height: '100%',
  width: '100%',
});

export const StyledThemeSwitch = styled('div', {
  width: `100%`,
  display: 'flex',
  justifyContent: `space-between`,
  gap: theme.space[6],
  padding: theme.space[6],
  marginTop: theme.space[6],
  span: {
    color: theme.colors.text2,
  },
});

export const StyledThemeSwitchButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
});

export const StyledIcon = styled('div', {
  all: 'unset',
  cursor: 'pointer',
  // position: 'fixed',

  svg: {
    height: theme.space[6],
    width: theme.space[6],
    path: {
      stroke: theme.colors.text2,
    },
  },
});
