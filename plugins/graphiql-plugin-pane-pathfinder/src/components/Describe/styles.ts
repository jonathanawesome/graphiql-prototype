import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const NameAndType = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 4,

  span: {
    whiteSpace: 'nowrap',
  },
});

export const Name = styled('span', {
  fontWeight: '$semiBold',
  color: '$gray100',
});

export const Type = styled('span', {
  fontWeight: '$regular',
  color: '$gray060',

  '&:hover': {
    color: '$gray100',
    textDecoration: 'underline',
  },
});

export const Description = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  textAlign: 'left',
  gap: 8,
  fontSize: 11,
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
          color: '$secondary100',
        },
      },
    },
    {
      type: 'INLINE_FRAGMENT',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: '$info100',
        },
      },
    },
    {
      type: 'ARGUMENT',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: '$primary100',
        },
      },
    },
    {
      type: 'INPUT_TYPE',
      isSelected: true,
      css: {
        [`& ${Name}, & ${Type}`]: {
          color: '$primary100',
        },
      },
    },
  ],
});
