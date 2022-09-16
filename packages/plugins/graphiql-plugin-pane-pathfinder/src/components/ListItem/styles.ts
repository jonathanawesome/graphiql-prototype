import { styled, theme } from '@graphiql-prototype/ui-library';
import * as Collapsible from '@radix-ui/react-collapsible';

export const ListItemStyled = styled('li', {
  all: 'unset',
});

export const Layout = styled('div', {
  width: '100%',
  display: 'grid',
  // gridTemplateColumns: '1fr',
  gridTemplateColumns: '16px 16px 1fr',

  alignItems: 'center',
  gap: theme.space[2],

  // '&:hover': {
  //   backgroundColor: theme.colors.surface2,
  // },

  variants: {
    hasToggler: {
      true: {
        // gridTemplateColumns: '16px 1fr',
      },
    },
    isCollapsible: {
      true: {
        // gridTemplateColumns: '16px 1fr',
      },
    },
  },

  compoundVariants: [
    {
      hasToggler: true,
      isCollapsible: true,
      css: {
        // gridTemplateColumns: '16px 16px 1fr',
      },
    },
  ],
});

export const CollapsibleRoot = styled(Collapsible.Root, {
  position: 'relative',
});

export const CollapsibleTrigger = styled(Collapsible.Trigger, {
  height: 15,
  width: 15,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:focus': {
    outline: `1px dotted ${theme.colors.text4}`,
  },

  svg: {
    height: 7,
    width: 7,
  },

  '&:hover': {
    svg: {
      fill: theme.colors.text2,
    },
  },

  variants: {
    isOpen: {
      true: {
        svg: {
          transform: 'rotate(90deg)',
          // fill: theme.colors.violet_default,
        },
      },
      false: {
        svg: {
          fill: theme.colors.text4,
        },
      },
    },
    variant: {
      FIELD: {
        // backgroundColor: 'orange',
      },
      INLINE_FRAGMENT: {},
      ARGUMENT: {},
      INPUT_OBJECT: {},
    },
  },

  compoundVariants: [
    {
      isOpen: true,
      variant: 'FIELD',
      css: {
        svg: {
          fill: theme.colors.violet_default,
        },
      },
    },
    {
      isOpen: true,
      variant: 'ARGUMENT',
      css: {
        svg: {
          fill: theme.colors.pink_default,
        },
      },
    },
    {
      isOpen: true,
      variant: 'INLINE_FRAGMENT',
      css: {
        svg: {
          fill: theme.colors.violet_default,
        },
      },
    },
    {
      isOpen: true,
      variant: 'INPUT_OBJECT',
      css: {
        svg: {
          fill: theme.colors.orange_default,
        },
      },
    },
  ],
});

export const CollapsibleContent = styled(Collapsible.Content, {
  paddingLeft: theme.space[6],
  marginTop: theme.space[3],
  // marginLeft: 7,
  position: `relative`,
  // borderLeft: `1px solid red`,

  '&::after': {
    content: '',
    position: `absolute`,
    top: 0,
    left: 7,
    height: `100%`,
    width: 1,
    backgroundColor: theme.colors.surface3,
  },

  variants: {
    isOpen: {
      true: {
        '&::after': {
          // backgroundColor: theme.colors.violet_light,
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
      isOpen: true,
      variant: 'FIELD',
      css: {
        '&::after': {
          backgroundColor: theme.colors.violet_light,
        },
      },
    },
    {
      isOpen: true,
      variant: 'ARGUMENT',
      css: {
        '&::after': {
          backgroundColor: theme.colors.pink_default,
        },
      },
    },
    {
      isOpen: true,
      variant: 'INLINE_FRAGMENT',
      css: {
        '&::after': {
          backgroundColor: theme.colors.violet_default,
        },
      },
    },
    {
      isOpen: true,
      variant: 'INPUT_OBJECT',
      css: {
        '&::after': {
          backgroundColor: theme.colors.orange_default,
        },
      },
    },
  ],
});

export const ChildFields = styled('ul', {
  all: `unset`,
  padding: 0,
  margin: 0,

  display: 'flex',
  flexDirection: 'column',
  gap: 12,

  // paddingLeft: 17,
  // marginLeft: 7,
  // variants: {
  //   variant: {
  //     FIELD: {
  //       // marginLeft: 7,
  //       // borderLeft: `1px solid ${theme.colors.surface3}`,
  //       // backgroundColor: theme.colors.violet_default,
  //     },
  //     INLINE_FRAGMENT: {
  //       // paddingLeft: 18,
  //       // marginLeft: 0,
  //     },
  //     ARGUMENT: {
  //       backgroundColor: theme.colors.pink_default,
  //       // borderLeft: `1px solid ${theme.colors.surface3}`,
  //     },
  //     INPUT_OBJECT: {
  //       backgroundColor: 'orange',
  //     },
  //     // ROOT: {
  //     //   // borderLeft: `1px solid ${theme.colors.surface3}`,
  //     //   // marginBottom: theme.space[3],
  //     // },
  //   },
  // },
});

export const StyledLeafIndicator = styled('div', {
  height: theme.space[4],
  width: theme.space[4],
  display: 'flex',
  alignItems: `center`,
  justifyContent: `center`,

  svg: {
    height: theme.space[1],
    width: theme.space[1],
    circle: {
      fill: theme.colors.surface3,
    },
  },
});
