import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledAnalyzeWrap = styled('div', {
  display: 'flex',
  height: '100%',
  width: '100%',
  position: 'relative',
  backgroundColor: theme.colors.surface1,
  paddingTop: theme.space[4],
  paddingBottom: theme.space[4],

  variants: {
    isExecuting: {
      true: { opacity: 0.5 },
    },
  },
});
