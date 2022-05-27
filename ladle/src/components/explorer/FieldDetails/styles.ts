import { styled } from '@stitches/react';

export const NameAndTypeName = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  '& span:nth-of-type(1)': {
    fontWeight: `$medium`,
    color: `$scale800`,
  },
  '& span:nth-of-type(2)': {
    fontWeight: `$regular`,
    color: `$scale700`,
  },
});

export const Description = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  gap: 8,
  fontSize: 11,
  color: `$scale600`,
  fontWeight: `$regular`,

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
  fontSize: '$body',
  // paddingBottom: 12,

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
    active: {
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
      active: true,
      css: {
        [`& ${NameAndTypeName}`]: {
          '& span:nth-of-type(1)': {
            color: '$accentField',
          },
          '& span:nth-of-type(2)': {
            color: '$accentField',
          },
        },
      },
    },
    {
      type: 'INLINE_FRAGMENT',
      active: true,
      css: {
        [`& ${NameAndTypeName}`]: {
          '& span:nth-of-type(1)': {
            color: '$accentInfo',
          },
          '& span:nth-of-type(2)': {
            color: '$accentInfo',
          },
        },
      },
    },
    {
      type: 'ARGUMENT' || 'INPUT_TYPE',
      active: true,
      css: {
        [`& ${NameAndTypeName}`]: {
          '& span:nth-of-type(1)': {
            color: '$accentArgument',
          },
          '& span:nth-of-type(2)': {
            color: '$accentArgument',
          },
        },
      },
    },
  ],
});
