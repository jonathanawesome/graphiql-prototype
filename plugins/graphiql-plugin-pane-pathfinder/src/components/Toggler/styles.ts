import { styled } from '@graphiql-prototype/graphiql-ui-library';

export const TogglerStyled = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    height: 15,
    width: 15,
    transition: 'transform .1s $authenticMotion',
  },

  variants: {
    variant: {
      ARGUMENT: {},
      FIELD: {},
    },
    isSelected: {
      true: {},
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

  compoundVariants: [
    {
      isSelected: true,
      variant: 'FIELD',
      css: {
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
    },
    {
      isSelected: true,
      variant: 'ARGUMENT',
      css: {
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
    },
  ],
});
