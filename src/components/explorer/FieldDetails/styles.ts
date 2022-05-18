import { styled } from '@stitches/react';

export const NameAndTypeName = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  '& span:nth-of-type(1)': {
    fontWeight: 500,
    color: `$scale800`,
  },
  '& span:nth-of-type(2)': {
    fontWeight: 400,
    color: `$scale700`,
  },

  variants: {
    pointer: {
      true: {
        cursor: 'pointer',
      },
    },
  },
});

export const Description = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: `$scale600`,
  fontWeight: 400,

  '& svg': {
    height: 2,
    width: 2,
  },
});

export const FieldDetailsStyled = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: `6px 0`,
  fontSize: 12,
  cursor: 'default',

  '&:hover': {
    // backgroundColor: 'LightBlue',
  },

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
      field: {},
      argument: {},
    },
  },

  compoundVariants: [
    {
      type: 'field',
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
      type: 'argument',
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
