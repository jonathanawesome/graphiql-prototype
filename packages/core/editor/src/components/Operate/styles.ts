import { styled, theme } from '@graphiql-prototype/ui-library';

export const OperateWrap = styled('div', {
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundColor: theme.colors.surface2,
});

export const OperationEditor = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
  paddingTop: 20,
  paddingRight: 64,
  paddingBottom: 20,
  paddingLeft: 12,
});

export const OperationActionsWrap = styled('div', {
  position: 'absolute',
  top: 16,
  right: 16,
});

export const OperationToolsWrap = styled('div', {
  // position: 'absolute',
  // bottom: 0,
  width: '100%',
});
