import { keyframes, styled, theme } from '@graphiql-prototype/ui-library';

export const StyledConnectionSettings = styled('div', {
  position: `relative`,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.colors.surface3}`,
});

export const spin = keyframes({
  '0%': { transform: `rotate(0deg)` },
  '100%': { transform: `rotate(360deg)` },
});

export const StyledRefreshButtonWrap = styled('div', {
  button: {
    height: '100%',
  },

  variants: {
    schemaLoading: {
      true: {
        button: {
          svg: {
            animation: `${spin} .75s ease-in-out infinite`,
          },
        },
      },
    },
  },
});

export const StyledSettingsWrap = styled('div', {
  position: `relative`,
  display: `flex`,
  width: `100%`,
});

export const StyledActiveURL = styled('button', {
  all: `unset`,
  position: `relative`,
  zIndex: 2,
  cursor: `pointer`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `center`,
  gap: 2,
  width: `inherit`,
  height: `100%`,
  paddingLeft: theme.space[4],
  backgroundColor: theme.colors.surface1,
  color: theme.colors.text4,
  fontSize: 12,
  borderLeft: `1px solid ${theme.colors.surface3}`,
  borderRight: `1px solid ${theme.colors.surface3}`,

  '&:hover': {
    backgroundColor: theme.colors.surface2,
  },

  span: {
    color: theme.colors.text3,
    fontSize: 10,
  },
});

export const StyledSettingsPanel = styled('div', {
  display: `flex`,
  backgroundColor: theme.colors.surface1,
  borderRight: `1px solid ${theme.colors.surface3}`,
  borderBottom: `1px solid ${theme.colors.surface3}`,
  borderLeft: `1px solid ${theme.colors.surface3}`,
  width: `100%`,
  padding: `${theme.space[3]} ${theme.space[6]}`,
  position: `absolute`,
  zIndex: 1,
  top: 48,
  left: 0,
  boxShadow: '8px 8px 24px 4px hsla(0, 0%, 0%, .1)',
});

export const StyledWorkspaceNavigation = styled('div', {
  display: `flex`,
});

export const StyledWorkspaceNavigationButton = styled('button', {
  position: `relative`,
  height: '100%',
  display: `flex`,
  alignItems: `center`,
  textAlign: `center`,
  padding: `0 ${theme.space[3]}`,
  borderRight: `1px solid ${theme.colors.surface3}`,
  color: theme.colors.text3,
  fontSize: 12,
  fontWeight: theme.fontWeights.medium,

  '&::last-of-type': {
    borderRight: `none`,
  },

  '&:hover': {
    backgroundColor: theme.colors.surface2,
  },

  '&:after': {
    content: `none`,
  },

  variants: {
    isActive: {
      true: {
        '&:after': {
          content: ``,
          position: `absolute`,
          bottom: -1,
          left: 0,
          width: `100%`,
          height: 2,
          backgroundColor: theme.colors.green_default,
        },
      },
    },
  },
});
