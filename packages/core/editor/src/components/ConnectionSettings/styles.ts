import { keyframes, styled, theme } from '@graphiql-prototype/ui-library';

export const StyledConnectionSettings = styled('div', {
  position: `relative`,
  zIndex: 5,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'space-between',
});

export const StyledConnectionSettingsTab = styled('div', {
  color: theme.colors.text2,
  padding: theme.space[4],

  ul: {
    margin: 0,
    paddingLeft: 12,
  },
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
  zIndex: 10,
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
  // backgroundColor: theme.colors.surface1,
  color: theme.colors.text4,
  fontSize: 12,
  // borderLeft: `1px solid ${theme.colors.surface3}`,
  // borderRight: `1px solid ${theme.colors.surface3}`,
  hairlineX: theme.colors.surface3,

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
  // hairlineLRB: theme.colors.surface3,
  width: `100%`,
  padding: `${theme.space[3]} ${theme.space[6]}`,
  position: `absolute`,
  zIndex: 1,
  top: 48,
  left: 0,
  boxShadow: '8px 8px 24px 4px hsla(0, 0%, 0%, .1)',
});

export const StyledGlobalHeaders = styled('div', {
  paddingTop: theme.space[6],
  paddingBottom: theme.space[4],
});
