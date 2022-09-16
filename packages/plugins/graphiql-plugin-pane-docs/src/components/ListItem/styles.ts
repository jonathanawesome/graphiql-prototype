import { styled, theme } from '@graphiql-prototype/ui-library';

export const NameAndType = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  borderBottom: '1px solid transparent',

  span: {
    whiteSpace: 'nowrap',
  },
});

export const Name = styled('span', {
  color: theme.colors.text2,
});
export const StyledDescription = styled('div', {
  color: theme.colors.text2,
  backgroundColor: theme.colors.blue_lightest,
  borderLeft: `1px solid ${theme.colors.blue_default}`,
  paddingLeft: theme.space[3],
  marginBottom: theme.space[3],
});

export const Type = styled('span', {
  color: theme.colors.text3,

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
      color: theme.colors.text2,
      textDecoration: 'underline',
    },

    '&:focus': {
      outline: `2px solid red`,
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
  color: theme.colors.text3,
  fontSize: 12,

  svg: {
    height: 2,
    width: 2,
    circle: {
      fill: theme.colors.text4,
    },
  },
});

export const ListItemStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',

  gap: 6,
  fontSize: '$body',
  // backgroundColor: 'orange',

  variants: {
    // descriptionPlacement: {
    //   Below: {
    //     flexDirection: 'column',
    //     alignItems: 'flex-start',
    //     [`& ${Description}`]: {
    //       svg: {
    //         display: 'none',
    //       },
    //     },
    //   },
    //   Inline: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     [`& ${Description}`]: {
    //       whiteSpace: 'nowrap',
    //       overflow: 'hidden',
    //     },
    //   },
    //   Off: {
    //     [`& ${Description}`]: {
    //       display: 'none',
    //     },
    //   },
    // },
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
      entityType: 'INPUT_TYPE',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: theme.colors.pink_default,
        },
      },
    },
  ],
});
