import { styled, theme } from '@graphiql-prototype/ui-library';

export const TogglerStyled = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    // height: theme.space[3],
    // width: theme.space[3],
    height: 14,
    width: 14,
    transition: 'transform .1s $authenticMotion',
  },

  // '&:focus': {
  //   outline: `1px dotted ${theme.colors.text4}`,
  // },

  variants: {
    variant: {
      ARGUMENT: {},
      FIELD: {},
    },
    isSelected: {
      true: {},
      false: {
        '&:hover, &:focus': {
          // backgroundColor: 'orange',
          svg: {
            path: {
              '&:nth-of-type(1)': {
                //inner
                // fill: theme.colors.surface3,
              },
              '&:nth-of-type(2)': {
                //outer
                fill: theme.colors.text2,
              },
            },
          },
        },
        svg: {
          // transform: 'scale(0.85)',
          path: {
            '&:nth-of-type(1)': {
              //inner
              fill: 'transparent',
            },
            '&:nth-of-type(2)': {
              //outer
              fill: theme.colors.text4,
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
              fill: theme.colors.violet_default,
            },
            '&:nth-of-type(2)': {
              //outer
              fill: theme.colors.violet_default,
            },
            '&:nth-of-type(3)': {
              //checkmark
              fill: theme.colors.surface1,
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
              fill: theme.colors.pink_default,
            },
            '&:nth-of-type(2)': {
              //outer
              fill: theme.colors.pink_default,
            },
            '&:nth-of-type(3)': {
              //checkmark
              fill: theme.colors.surface1,
            },
          },
        },
      },
    },
  ],
});
