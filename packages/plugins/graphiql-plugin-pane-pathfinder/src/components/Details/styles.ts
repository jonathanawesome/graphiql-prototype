import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledDetails = css({
  display: 'flex',
  gap: 6,
  fontSize: theme.fontSizes.body,
  cursor: `pointer`,
  marginLeft: theme.space[2],
  width: `100%`,

  '& .details-name-and-controls': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.space[1],
    borderBottom: '1px solid transparent',
    fontSize: 14,
    span: {
      whiteSpace: 'nowrap',
    },
    width: `100%`,
  },

  '& .details-name': {
    fontWeight: theme.fontWeights.regular,
    color: theme.colors.text2,
    // color: 'Red',
  },

  '& .details-controls': {
    display: `flex`,
    gap: 2,
    alignContent: `center`,
  },

  variants: {
    isSelected: {
      true: {},
    },
    entityType: {
      FIELD: {},
      INLINE_FRAGMENT: {},
      ARGUMENT: {},
      INPUT_OBJECT: {},
      ROOT: {},
    },
    controlsVisible: {
      true: {
        '& .details-controls': {
          visibility: `visible`,
          opacity: 1,
        },
      },
      false: {
        '& .details-controls': {
          visibility: `hidden`,
          opacity: 0,
        },
      },
    },
  },

  compoundVariants: [
    {
      entityType: 'FIELD',
      isSelected: true,
      css: {
        [`& .details-name`]: {
          color: theme.colors.violet_default,
        },
      },
    },
    {
      entityType: 'INLINE_FRAGMENT',
      isSelected: true,
      css: {
        [`& .details-name`]: {
          color: theme.colors.blue_default,
        },
      },
    },
    {
      entityType: 'ARGUMENT',
      isSelected: true,
      css: {
        [`& .details-name`]: {
          color: theme.colors.pink_default,
        },
      },
    },
    {
      entityType: 'INPUT_OBJECT',
      isSelected: true,
      css: {
        [`& .details-name`]: {
          color: theme.colors.text1,
        },
      },
    },
  ],
});
