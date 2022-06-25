import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const DocsOverlayStyled = styled('section', {
  position: 'absolute',
  top: 0,
  left: 32,
  height: '100%',
  width: 'calc(100% - 48px)',
  backgroundColor: '$white',
  border: '1px solid $gray015',
  borderRadius: 12,
  padding: 24,
  boxShadow:
    '0px 6px 20px rgba(59, 76, 106, 0.13), 0px 1.34018px 4.46726px rgba(59, 76, 106, 0.0774939), 0px 0.399006px 1.33002px rgba(59, 76, 106, 0.0525061)',
  transition: 'all .1s $authenticMotion',

  variants: {
    overlayVisible: {
      true: {
        visibility: 'visible',
        opacity: '1',
        transform: 'scale(1)',
      },
      false: {
        visibility: 'hidden',
        opacity: '0',
        transform: 'scale(0.98)',
      },
    },
  },
});

export const Span = styled('span', {
  display: 'block',
  fontSize: '$body',
  color: '$gray060',
  lineHeight: 1.5,
});

export const Column = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  overflowX: 'auto',
  position: 'relative',

  // '&::after': {
  //   content: '',
  //   position: 'absolute',
  //   top: 0,
  //   right: 0,
  //   width: 24,
  //   height: '100%',
  //   background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, $editorBackground 100%)',
  // },
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
  gap: 6,

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
    transform: 'rotate(90deg)',
    height: 8,
    width: 8,
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
      // fontWeight: 500,
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
        // flexDirection: 'column',
        alignItems: 'flex-start',
      },
      Inline: {
        // flexDirection: 'row',
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
  textTransform: 'uppercase',
});

export const Description = styled('span', {
  display: 'flex',
  alignItems: 'center',
  fontSize: 13,
  color: '$gray100',
  // fontWeight: 600,
  // textTransform: 'uppercase',
});
