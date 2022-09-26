import { styled, theme } from '@graphiql-prototype/ui-library';

export const EditorInner = styled('div', {
  display: 'grid',
  gridTemplateRows: ` ${theme.space[12]} ${theme.space[10]} 1fr`,
  height: '100%',
  width: '100%',

  variants: {
    activePane: {
      EDITOR: {
        gridTemplateRows: ` ${theme.space[12]} ${theme.space[10]} 1fr`,
      },
      SCHEMA: {
        gridTemplateRows: ` ${theme.space[12]}  1fr`,
      },
    },
  },
});

export const EditorWrap = styled('section', {
  position: `relative`,
  // zIndex: 1,
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  backgroundColor: theme.colors.surface1,
});
