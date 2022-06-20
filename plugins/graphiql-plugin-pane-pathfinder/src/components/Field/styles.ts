import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const FieldChildren = styled('div', {
  marginLeft: 20,
});

export const IndicatorWrap = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    height: 15,
    width: 15,
    transition: 'transform .1s $authenticMotion',
  },

  variants: {
    isActive: {
      true: {
        svg: {
          transform: 'scale(1)',
          path: {
            '&:nth-of-type(1)': {
              //inner
              fill: '$secondary100',
            },
            '&:nth-of-type(2)': {
              //outer
              fill: '$secondary100',
            },
            '&:nth-of-type(3)': {
              //checkmark
              fill: '$white',
            },
          },
        },
      },
      false: {
        svg: {
          transform: 'scale(0.85)',
          path: {
            '&:nth-of-type(1)': {
              //inner
              fill: 'transparent',
            },
            '&:nth-of-type(2)': {
              //outer
              fill: '$gray040',
            },
            '&:nth-of-type(3)': {
              //checkmark
              fill: 'transparent',
            },
          },
        },
      },
    },
  },
});
