import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledGraphiQLEditorInner = css({
  display: 'grid',
  height: '100%',
  width: '100%',
  overflow: 'hidden',

  variants: {
    activePane: {
      EDITOR: {
        gridTemplateRows: `${theme.space[12]}  1fr`,
      },
      SCHEMA: {
        gridTemplateRows: `${theme.space[12]} 0 1fr`,
      },
    },
  },
});

export const StyledGraphiQLEditor = css({
  position: `relative`,
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.colors.surface1,
});

export const StyledEditorWrap = css({
  width: '100%',
  display: `grid`,
  gridTemplateRows: `${theme.space[10]}  1fr`,
  variants: {
    isActive: {
      true: { visibility: `visible`, opacity: 1, height: '100%', overflow: `hidden` },
      false: { visibility: `hidden`, opacity: 0, height: '0' },
    },
  },
});

export const StyledSchemaWrap = css({
  height: '100%',
  width: '100%',

  variants: {
    isActive: {
      true: { visibility: `visible`, opacity: 1, height: '100%', overflow: `hidden` },
      false: { visibility: `hidden`, opacity: 0, height: '0' },
    },
  },
});
