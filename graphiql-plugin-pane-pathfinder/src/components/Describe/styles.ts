import { styled } from '@graphiql-v2-prototype/graphiql-v2';

export const NameTypePills = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,
});

export const Name = styled('span', {
  fontWeight: '$regular',
  color: '$scale800',
});

export const Type = styled('span', {
  fontWeight: '$regular',
  color: '$scale700',
});

export const Description = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  gap: 8,
  fontSize: 11,
  lineHeight: 1.3,
  color: '$scale700',
  fontWeight: '$regular',

  svg: {
    height: 2,
    width: 2,
  },
});

export const DescribeStyled = styled('div', {
  display: 'flex',
  gap: 6,
  fontSize: '$body',

  variants: {
    descriptionsVisibility: {
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
          // flex: 1,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          // textOverflow: 'ellipsis',
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
        [`& ${Name}, & ${Type}`]: {
          color: '$accentField',
        },
      },
    },
    {
      type: 'INLINE_FRAGMENT',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: '$accentInfo',
        },
      },
    },
    {
      type: 'ARGUMENT',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: '$accentArgument',
        },
      },
    },
    {
      type: 'INPUT_TYPE',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: '$accentArgument',
        },
      },
    },
  ],
});
