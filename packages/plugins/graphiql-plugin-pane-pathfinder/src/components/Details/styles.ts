import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledNameAndControls = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[1],
  borderBottom: '1px solid transparent',
  fontSize: 14,
  span: {
    whiteSpace: 'nowrap',
  },
  width: `100%`,
});

export const StyledName = styled('span', {
  fontWeight: theme.fontWeights.regular,
  color: theme.colors.text2,
});

export const StyledControls = styled('div', {
  display: `flex`,
  gap: 2,
  alignContent: `center`,

  variants: {
    isVisible: {
      true: {
        visibility: `visible`,
        opacity: 1,
      },
      false: {
        visibility: `hidden`,
        opacity: 0,
      },
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
  marginLeft: theme.space[2],
  width: `100%`,

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
        [`& ${StyledName}`]: {
          color: theme.colors.violet_default,
        },
      },
    },
    {
      entityType: 'INLINE_FRAGMENT',
      isSelected: true,
      css: {
        [`& ${StyledName}`]: {
          color: theme.colors.blue_default,
        },
      },
    },
    {
      entityType: 'ARGUMENT',
      isSelected: true,
      css: {
        [`& ${StyledName}`]: {
          color: theme.colors.pink_default,
        },
      },
    },
    {
      entityType: 'INPUT_OBJECT',
      isSelected: true,
      css: {
        [`& ${StyledName}`]: {
          color: theme.colors.text1,
        },
      },
    },
  ],
});
