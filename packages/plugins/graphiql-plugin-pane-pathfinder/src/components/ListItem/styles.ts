import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledListItem = styled('li', {
  all: 'unset',
  width: `100%`,
});

export const StyledCollapsibleListItemLeadWrap = styled('div', {
  display: `flex`,
  width: `100%`,
});

export const StyledCollapsibleListItemTriggerWrap = styled('div', {
  button: {
    svg: {
      transform: 'rotate(-90deg)',
    },
  },

  variants: {
    isExpanded: {
      true: {
        button: {
          svg: {
            transform: 'rotate(0deg)',
          },
        },
      },
      false: {},
    },
    variant: {
      FIELD: {},
      INLINE_FRAGMENT: {},
      ARGUMENT: {},
      INPUT_OBJECT: {},
    },
  },

  compoundVariants: [
    {
      isExpanded: true,
      variant: 'FIELD',
      css: {
        button: {
          svg: {
            path: {
              fill: theme.colors.violet_default,
            },
          },
        },
      },
    },
    {
      isExpanded: true,
      variant: 'ARGUMENT',
      css: {
        svg: {
          path: {
            fill: theme.colors.pink_default,
          },
        },
      },
    },
    {
      isExpanded: true,
      variant: 'INLINE_FRAGMENT',
      css: {
        svg: {
          path: {
            fill: theme.colors.blue_default,
          },
        },
      },
    },
    {
      isExpanded: true,
      variant: 'INPUT_OBJECT',
      css: {
        svg: {
          path: {
            fill: theme.colors.orange_default,
          },
        },
      },
    },
  ],
});

export const StyledListItemContent = styled('div', {
  position: `relative`,
  display: `none`,
  paddingLeft: theme.space[5],
  marginTop: theme.space[1],
  marginLeft: theme.space[2],

  '&::after': {
    content: '',
    position: `absolute`,
    top: 0,
    left: 5,
    height: `100%`,
    width: 1,
    backgroundColor: theme.colors.surface3,
  },

  variants: {
    isExpanded: {
      true: {
        display: `block`,
        // marginBottom: theme.space[3]
      },
      false: { display: `none` },
    },
    variant: {
      FIELD: {},
      INLINE_FRAGMENT: {},
      ARGUMENT: {},
      INPUT_OBJECT: {},
    },
  },

  compoundVariants: [
    {
      isExpanded: true,
      variant: 'FIELD',
      css: {
        '&::after': {
          // backgroundColor: theme.colors.violet_light,
          hairlineL: theme.colors.violet_light,
        },
      },
    },
    {
      isExpanded: true,
      variant: 'ARGUMENT',
      css: {
        '&::after': {
          // backgroundColor: theme.colors.pink_default,
          // hairlineL: theme.colors.pink_default,
        },
      },
    },
    {
      isExpanded: true,
      variant: 'INLINE_FRAGMENT',
      css: {
        '&::after': {
          // backgroundColor: theme.colors.blue_default,
          hairlineL: theme.colors.blue_default,
        },
      },
    },
    {
      isExpanded: true,
      variant: 'INPUT_OBJECT',
      css: {
        '&::after': {
          // backgroundColor: theme.colors.orange_default,
          hairlineL: theme.colors.orange_default,
        },
      },
    },
  ],
});

export const StyledListItemLeadWrap = styled('div', {
  width: `100%`,
  display: 'grid',
  height: theme.space[7],
  gridTemplateColumns: `${theme.space[7]} ${theme.space[7]}  1fr`,
  alignItems: 'center',
});

export const StyledChildFields = styled('ul', {
  all: `unset`,
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  // marginLeft: theme.space[2],
});

export const StyledLeafIndicator = styled('div', {
  height: theme.space[7],
  width: theme.space[7],
  display: 'flex',
  alignItems: `center`,
  justifyContent: `center`,

  svg: {
    height: 3,
    width: 3,
    circle: {
      fill: theme.colors.surface3,
    },
  },
});
