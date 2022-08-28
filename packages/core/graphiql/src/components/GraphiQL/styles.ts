import { styled } from '@graphiql-prototype/ui-library';

export const GraphiQLWrap = styled('div', {
  backgroundColor: '$appBackground',
  height: '100%',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '60px 1fr',
  overflow: 'hidden',
});

export const ContentWrap = styled('div', {
  height: '100%',
  overflow: 'hidden',
  paddingTop: 16,
  paddingRight: 16,
  paddingBottom: 16,
  paddingLeft: 0,
});

export const PaneWrap = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
  transition: 'opacity .05s $authenticMotion',
  paddingLeft: 32,
  paddingRight: 24,

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

export const PluginName = styled('div', {
  fontSize: 22,
  fontWeight: 600,
  color: '$gray100',
  position: 'relative',
  height: 40,
  marginBottom: 12,
  flexShrink: 0,

  span: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    display: 'block',
  },
});
