import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledListItem = css({
  all: 'unset',
  width: `100%`,

  '& .listItem-lead-wrap': {
    width: `100%`,
    display: 'grid',
    height: theme.space[7],
    gridTemplateColumns: `${theme.space[7]} ${theme.space[7]}  1fr`,
    alignItems: 'center',
  },

  '& .collapsible-listItem-lead-wrap': {
    display: `flex`,
    width: `100%`,
  },

  '& .listItem-content': {
    position: `relative`,
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
  },

  '& .child-fields': {
    all: `unset`,
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
  },

  '& .leaf-indicator': {
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
  },

  variants: {
    isExpanded: {
      true: {
        '& .collapsible-listItem-trigger-wrap': {
          button: {
            svg: {
              transform: 'rotate(0deg)',
            },
          },
        },
      },
      false: {},
    },
    variant: {
      FIELD: {},
      INLINE_FRAGMENT: {},
      INPUT_OBJECT: {},
    },
  },

  compoundVariants: [
    {
      isExpanded: true,
      variant: 'FIELD',
      css: {
        ['& .listItem-content']: {
          ['&::after']: {
            hairlineL: theme.colors.violet_light,
          },
        },
      },
    },
    {
      isExpanded: true,
      variant: 'INPUT_OBJECT',
      css: {
        ['& .listItem-content']: {
          ['&::after']: {
            hairlineL: theme.colors.orange_light,
          },
        },
      },
    },
    {
      isExpanded: true,
      variant: 'INLINE_FRAGMENT',
      css: {
        ['& .listItem-content']: {
          ['&::after']: {
            hairlineL: theme.colors.blue_default,
          },
        },
      },
    },
  ],
});

export const StyledCollapsibleListItemTriggerWrap = css({
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
