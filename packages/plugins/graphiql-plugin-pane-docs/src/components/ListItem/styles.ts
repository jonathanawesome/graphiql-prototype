import { styled } from '@graphiql-prototype/ui-library';

export const NameAndType = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
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
  color: '$gray100',
});

export const Type = styled('span', {
  fontWeight: '$regular',
  color: '$gray060',

  button: {
    '&:hover': {
      color: '$gray100',
      textDecoration: 'underline',
    },
  },
});

export const Description = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  gap: 8,
  lineHeight: 1.3,
  color: '$gray060',
  fontWeight: '$regular',

  svg: {
    height: 2,
    width: 2,
    circle: {
      fill: '$gray040',
    },
  },
});

export const ListItemStyled = styled('div', {
  display: 'flex',
  gap: 6,
  fontSize: '$body',

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
      INPUT_TYPE: {},
    },
  },

  compoundVariants: [
    {
      entityType: 'FIELD',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: '$secondary100',
        },
      },
    },
    {
      entityType: 'INLINE_FRAGMENT',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: '$info100',
        },
      },
    },
    {
      entityType: 'ARGUMENT',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: '$primary100',
        },
      },
    },
    {
      entityType: 'INPUT_TYPE',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: '$primary100',
        },
      },
    },
  ],
});
