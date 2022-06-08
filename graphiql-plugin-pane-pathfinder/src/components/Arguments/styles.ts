import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const ArgumentsWrap = styled('div', {
  marginTop: 12,
});

export const RequiredArgumentsWrap = styled('div', {
  marginBottom: 8,
});

export const Span = styled('span', {
  display: 'inline-flex',
  alignContent: 'center',
  fontWeight: '$medium',
  fontSize: 12,
  lineHeight: 1,
  height: 15,
  color: '$scale700',
  marginLeft: 8,
  marginTop: 2,
});

export const IconWrap = styled('div', {
  height: 15,
  width: 15,
  position: 'relative',

  svg: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate3d(-50%, -50%, 0)',
    height: 24,
    width: 24,
  },
});
