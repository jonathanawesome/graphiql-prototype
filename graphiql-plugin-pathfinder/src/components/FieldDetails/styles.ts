import { styled } from '@stitches/react';

import { theme } from '@graphiql-v2-prototype/graphiql-v2';

export const NameAndTypeName = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  '& span:nth-of-type(1)': {
    fontWeight: theme.fontWeights.regular,
    color: theme.colors.scale800.value,
  },
  '& span:nth-of-type(2)': {
    fontWeight: theme.fontWeights.regular,
    color: theme.colors.scale700.value,
  },
});

export const Description = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  gap: 8,
  fontSize: 11,
  color: theme.colors.scale600.value,
  fontWeight: theme.fontWeights.regular,

  '& svg': {
    height: 2,
    width: 2,
  },
});

export const FieldDetailsStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 6,
  fontSize: theme.fontSizes.body.value,

  '&:hover': {},

  variants: {
    inlineDescription: {
      false: {
        flexDirection: 'column',
        [`& ${Description}`]: {
          paddingLeft: 12,

          '& svg': {
            display: 'none',
          },
        },
      },
    },
    isSelected: {
      true: {},
    },
    type: {
      FIELD: {},
      INLINE_FRAGMENT: {},
      ARGUMENT: {},
      INPUT_TYPE: {},
    },
  },

  compoundVariants: [
    {
      type: 'FIELD',
      isSelected: true,
      css: {
        [`& ${NameAndTypeName}`]: {
          '& span:nth-of-type(1)': {
            color: theme.colors.accentField.value,
          },
          '& span:nth-of-type(2)': {
            color: theme.colors.accentField.value,
          },
        },
      },
    },
    {
      type: 'INLINE_FRAGMENT',
      isSelected: true,
      css: {
        [`& ${NameAndTypeName}`]: {
          '& span:nth-of-type(1)': {
            color: theme.colors.accentInfo.value,
          },
          '& span:nth-of-type(2)': {
            color: theme.colors.accentInfo.value,
          },
        },
      },
    },
    {
      type: 'ARGUMENT',
      isSelected: true,
      css: {
        [`& ${NameAndTypeName}`]: {
          '& span:nth-of-type(1)': {
            color: theme.colors.accentArgument.value,
          },
          '& span:nth-of-type(2)': {
            color: theme.colors.accentArgument.value,
          },
        },
      },
    },
    {
      type: 'INPUT_TYPE',
      isSelected: true,
      css: {
        [`& ${NameAndTypeName}`]: {
          '& span:nth-of-type(1)': {
            color: theme.colors.accentArgument.value,
          },
          '& span:nth-of-type(2)': {
            color: theme.colors.accentArgument.value,
          },
        },
      },
    },
  ],
});
