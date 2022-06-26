import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const DocsStyled = styled('section', {
  paddingTop: 24,
  paddingBottom: 24,
  height: '100%',
  width: 'calc(100% - 48px)',
  position: 'absolute',
  top: 0,
  left: 32,
  overflowY: 'auto',
});

export const Span = styled('span', {
  display: 'block',
  fontSize: '$body',
  color: '$gray060',
  lineHeight: 1.5,
});

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  marginBottom: 24,
});

export const Left = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 7,
});

export const Right = styled('div', {});

export const BackButton = styled('button', {
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  marginLeft: -4,

  '&:hover': {
    svg: {
      path: {
        fill: '$gray100',
      },
    },
    span: {
      color: '$gray100',
    },
  },

  svg: {
    height: 16,
    width: 16,
    path: {
      fill: '$gray060',
    },
  },

  span: {
    display: 'block',
    marginTop: 1,
    fontSize: 13,
    lineHeight: 1,
    color: '$gray060',
    fontWeight: 500,
  },
});

export const CurrentTypeName = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 10,

  span: {
    '&:nth-of-type(1)': {
      fontSize: 20,
      fontWeight: 500,
      color: '$gray100',
    },
    '&:nth-of-type(2)': {
      padding: '2px 4px',
      fontSize: 13,
      color: '$gray060',
      borderRadius: 4,
      border: '1px solid $gray015',
    },
  },
});

export const CloseButton = styled('button', {
  svg: {
    transform: 'translate3d(5px, -7px, 0)',
    height: 24,
    width: 24,
    path: {
      fill: '$gray040',
    },
  },

  '&:hover': {
    svg: {
      path: {
        fill: '$gray100',
      },
    },
  },
});

export const DescribeWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  // gap: 6,

  variants: {
    descriptionsVisibility: {
      Below: {
        alignItems: 'flex-start',
      },
      Inline: {
        alignItems: 'center',
      },
      Off: {},
    },
  },
});

export const SeparatorWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  height: 16,
  width: 16,
  marginRight: -4,

  svg: {
    height: 4,
    width: 4,
    circle: {
      fill: '$gray040',
    },
  },
});

export const SmallCaps = styled('span', {
  display: 'flex',
  alignItems: 'center',
  fontSize: 10,
  fontWeight: 600,
  color: '$gray060',
  letterSpacing: 0.5,
  textTransform: 'uppercase',
  marginBottom: 8,
});
