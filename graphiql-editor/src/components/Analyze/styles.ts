import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const AnalyzeWrap = styled('div', {
  display: 'flex',
  height: '100%',
  width: '100%',
  position: 'relative',
  paddingTop: 8,

  '&::after': {
    content: '',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 24,
    height: '100%',
    background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, $scale300 100%)',
  },
});
