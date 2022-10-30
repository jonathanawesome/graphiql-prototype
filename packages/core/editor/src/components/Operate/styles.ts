import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledOperateWrap = styled('div', {
  width: `100%`,
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `flex-end`,
  position: `relative`,
  overflow: `hidden`,
  paddingRight: theme.space[4],
});

export const StyledOperationEditor = styled('div', {
  overflowY: `auto`,
  height: `100%`,
  position: `relative`,
  paddingTop: theme.space[5],
  paddingRight: theme.space[1],
  paddingBottom: theme.space[4],
  hairlineB: theme.colors.surface3,
});

export const StyledOperationActionsWrap = styled('div', {
  paddingBottom: theme.space[4],
  hairlineB: theme.colors.surface3,
});

export const StyledOperationToolsWrap = styled('div', {
  width: '100%',
  marginBottom: -1,
});
