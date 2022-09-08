import { styled, theme } from '@graphiql-prototype/ui-library';

export const GraphiQLWrap = styled('div', {
  backgroundColor: theme.colors.surface1,
  height: '100%',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '60px 1fr',
  overflow: 'hidden',
});

export const PaneWrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  transition: 'opacity .05s $authenticMotion',

  width: `100%`,
  borderRight: `1px solid ${theme.colors.surface3}`,

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
