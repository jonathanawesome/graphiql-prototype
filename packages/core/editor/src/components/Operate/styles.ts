import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledOperateWrap = styled('div', {
  backgroundColor: theme.colors.surface2,
  width: `100%`,
  height: `100%`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: `relative`,
});

export const StyledOperationEditor = styled('div', {
  height: `100%`,
  position: `relative`,
  paddingTop: 72,
  paddingRight: theme.space[1],
  paddingBottom: 0,
  paddingLeft: theme.space[4],
});

export const StyledOperationActionsWrap = styled('div', {
  position: 'absolute',
  width: `calc(100% - 32px)`,
  paddingBottom: theme.space[3],
  top: theme.space[4],
  left: theme.space[4],
  hairlineB: theme.colors.surface3,
});

export const StyledOperationToolsWrap = styled('div', {
  width: '100%',
  marginBottom: -1,
});
