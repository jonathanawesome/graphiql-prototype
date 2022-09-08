import { styled, theme } from '@graphiql-prototype/ui-library';

export const NameAndType = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: theme.space[1],
  borderBottom: '1px solid transparent',

  span: {
    whiteSpace: 'nowrap',
  },

  variants: {
    hasDocs: {
      true: {
        '&:hover': {
          borderBottom: '1px solid $gray060',
        },
      },
      false: {},
    },
  },
});

export const Name = styled('span', {
  fontWeight: 600,
  color: theme.colors.text2,
});

export const Type = styled('span', {
  fontWeight: '$regular',
  color: theme.colors.text2,

  button: {
    '&:hover': {
      textDecoration: 'underline',
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

export const DetailsStyled = styled('div', {
  display: 'flex',
  gap: 6,
  fontSize: theme.fontSizes.body,

  variants: {
    descriptionPlacement: {
      Below: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        [`& ${Description}`]: {
          svg: {
            display: 'none',
          },
        },
      },
      Inline: {
        flexDirection: 'row',
        alignItems: 'center',
        [`& ${Description}`]: {
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
      },
      Off: {
        [`& ${Description}`]: {
          display: 'none',
        },
      },
    },
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
        [`& ${Name}, & ${Type}`]: {
          color: theme.colors.violet_default,
        },
      },
    },
    {
      entityType: 'INLINE_FRAGMENT',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: theme.colors.blue_default,
        },
      },
    },
    {
      entityType: 'ARGUMENT',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: theme.colors.pink_default,
        },
      },
    },
    {
      entityType: 'INPUT_OBJECT',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: theme.colors.pink_default,
        },
      },
    },
  ],
});
