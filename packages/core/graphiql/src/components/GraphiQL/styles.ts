import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledGraphiQLWrap = css({
  backgroundColor: theme.colors.surface1,
  height: '100%',
  width: '100%',
  // display: 'grid',
  // gridTemplateColumns: '60px 1fr',
  overflow: 'hidden',
});

export const StyledPaneWrap = css({
  width: `100%`,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  transition: 'opacity .05s $authenticMotion',

  variants: {
    schemaLoading: {
      true: {
        opacity: 0.25,
      },
      false: {
        opacity: 1,
      },
    },
  },
});
