import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const ScalarArgStyled = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  gap: 8,
});

export const IndicatorArgumentWrap = styled('div', {
  svg: {
    width: 15,
    height: 15,
  },

  variants: {
    isSelected: {
      true: {
        svg: {
          transform: 'scale(1)',
          path: {
            '&:nth-of-type(1)': {
              //inner
              fill: '$primary100',
            },
            '&:nth-of-type(2)': {
              //outer
              fill: '$primary100',
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
          transform: 'scale(1)',
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
