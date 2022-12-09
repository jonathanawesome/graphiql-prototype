import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledOperateWrap = css({
  backgroundColor: theme.colors.surface2,
  width: `100%`,
  height: `100%`,
  display: `flex`,
  flexDirection: `column`,
  justifyContent: `flex-end`,
  position: `relative`,
  overflow: `hidden`,
  paddingRight: theme.space[4],
});

export const StyledOperationEditor = css({
  overflowY: `auto`,
  height: `100%`,
  position: `relative`,
  paddingTop: theme.space[5],
  paddingRight: theme.space[1],
  paddingBottom: theme.space[4],
  hairlineB: theme.colors.surface3,
});

export const StyledOperationActionsWrap = css({
  position: 'absolute',
  width: `calc(100% - 32px)`,
  paddingBottom: theme.space[3],
  top: theme.space[4],
  left: theme.space[4],
  hairlineB: theme.colors.surface3,
});

export const StyledOperationToolsWrap = css({
  width: '100%',
  marginBottom: -1,
});
