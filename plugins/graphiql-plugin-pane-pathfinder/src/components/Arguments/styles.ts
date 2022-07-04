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
  color: '$gray060',
  marginLeft: 8,
  marginTop: 2,
  whiteSpace: 'nowrap',
});

export const ShowArgumentsIconWrap = styled('div', {
  height: 24,
  width: 24,
  position: 'relative',

  svg: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate3d(-50%, -50%, 0) rotate(0deg) !important',
    height: 24,
    width: 24,
    path: {
      '&:nth-of-type(1)': {
        fill: '$gray060',
      },
      '&:nth-of-type(2)': {
        fill: '$appBackground',
      },
      '&:nth-of-type(3)': {
        fill: '$gray060',
      },
      '&:nth-of-type(4)': {
        fill: '$appBackground',
      },
      '&:nth-of-type(5)': {
        fill: '$gray060',
      },
    },
  },
});
