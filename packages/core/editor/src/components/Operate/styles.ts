import { styled, theme } from '@graphiql-prototype/ui-library';

export const OperateWrap = styled('div', {
  backgroundColor: theme.colors.surface1,
  width: `100%`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

export const OperationEditor = styled('div', {
  position: `relative`,
  padding: theme.space[4],
  paddingRight: 64,
});

export const OperationActionsWrap = styled('div', {
  position: 'absolute',
  top: theme.space[4],
  right: theme.space[4],
});

export const OperationToolsWrap = styled('div', {
  width: '100%',
  marginBottom: -1,
});
