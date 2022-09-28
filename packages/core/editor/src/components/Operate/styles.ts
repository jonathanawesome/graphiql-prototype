import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledOperateWrap = styled('div', {
  backgroundColor: theme.colors.surface1,
  width: `100%`,
  height: `100%`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  // position: `relative`,
});

export const StyledOperationEditor = styled('div', {
  position: `relative`,
  padding: theme.space[4],
  paddingRight: 64,
});

export const StyledOperationActionsWrap = styled('div', {
  position: 'absolute',
  top: theme.space[4],
  right: theme.space[4],
});

export const StyledOperationToolsWrap = styled('div', {
  width: '100%',
  marginBottom: -1,
});

export const StyledMessageContainer = styled('div', {
  width: `calc(100%- 32px)`,
  margin: 16,
  flexGrow: -1,
  // position: `absolute`,
  // top: 0,
  // left: 0,
  // color: 'red',
  // backgroundColor: 'orange',

  button: {
    fontWeight: theme.fontWeights.semiBold,

    '&:hover': {
      textDecoration: `underline`,
    },
  },
});
