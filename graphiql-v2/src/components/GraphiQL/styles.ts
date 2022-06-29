import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const GraphiQLWrap = styled('div', {
  backgroundColor: '$appBackground',
  height: '100%',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '60px 1fr',
});

export const ContentWrap = styled('div', {
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

export const SchemaName = styled('div', {
  padding: '12px 32px',
  fontSize: 22,
  fontWeight: 600,
  color: '$gray100',
  position: 'relative',
  height: 52,

  span: {
    position: 'absolute',
    display: 'block',
  },
});
