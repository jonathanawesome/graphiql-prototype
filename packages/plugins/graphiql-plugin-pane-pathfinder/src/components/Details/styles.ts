import { styled, theme } from '@graphiql-prototype/ui-library';

export const NameAndType = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[2],
  borderBottom: '1px solid transparent',
  fontSize: 14,
  span: {
    whiteSpace: 'nowrap',
  },

  variants: {
    hasDocs: {
      true: {
        '&:hover': {
          borderBottom: `1px solid ${theme.colors.text4}`,
        },
      },
      false: {},
    },
  },
});

export const Name = styled('span', {
  // fontWeight: 600,
  fontWeight: theme.fontWeights.regular,
  color: theme.colors.text2,
});

export const Type = styled('span', {
  fontWeight: theme.fontWeights.regular,
  color: theme.colors.text3,
  display: `flex`,
  alignContent: `center`,

  '&:hover': {
    svg: {
      height: 12,
      width: 12,
      path: {
        '&:nth-of-type(1)': {
          fill: 'transparent',
        },
        '&:nth-of-type(2)': {
          fill: theme.colors.text2,
        },
        '&:nth-of-type(3)': {
          fill: theme.colors.text2,
        },
      },
    },
  },

  svg: {
    height: 12,
    width: 12,
    path: {
      '&:nth-of-type(1)': {
        fill: 'transparent',
      },
      '&:nth-of-type(2)': {
        fill: theme.colors.text4,
      },
      '&:nth-of-type(3)': {
        fill: theme.colors.text4,
      },
    },
  },

  button: {
    '&:hover': {
      textDecoration: 'underline',
    },
    '&:focus': {
      outline: `1px dotted ${theme.colors.text4}`,
    },
  },
});

export const Description = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  gap: theme.space[2],
  lineHeight: 1.3,
  color: theme.colors.text3,
  fontWeight: '$regular',

  svg: {
    flexShrink: 0,
    height: 2,
    width: 2,
    circle: {
      fill: theme.colors.text4,
    },
  },
});

export const StyledDetails = styled('div', {
  display: 'flex',
  gap: 6,
  fontSize: theme.fontSizes.body,
  cursor: `pointer`,
  marginLeft: 8,

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
  },

  compoundVariants: [
    {
      entityType: 'FIELD',
      isSelected: true,
      css: {
        [`& ${Name}`]: {
          color: theme.colors.violet_default,
        },
      },
    },
    {
      entityType: 'INLINE_FRAGMENT',
      isSelected: true,
      css: {
        [`& ${Name}`]: {
          color: theme.colors.blue_default,
        },
      },
    },
    {
      entityType: 'ARGUMENT',
      isSelected: true,
      css: {
        [`& ${Name}`]: {
          color: theme.colors.pink_default,
        },
      },
    },
    {
      entityType: 'INPUT_OBJECT',
      isSelected: true,
      css: {
        [`& ${Name}`]: {
          color: theme.colors.text1,
        },
      },
    },
  ],
});
