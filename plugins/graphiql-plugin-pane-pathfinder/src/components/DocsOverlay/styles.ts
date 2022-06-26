import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const DocsOverlayStyled = styled('section', {
  padding: 24,
  height: '100%',
  width: 'calc(100% - 48px)',
  position: 'absolute',
  top: 0,
  left: 32,
  overflowY: 'auto',
  backgroundColor: '$white',
  border: '1px solid $gray015',
  borderRadius: 12,
  boxShadow:
    '0px 6px 20px rgba(59, 76, 106, 0.13), 0px 1.34018px 4.46726px rgba(59, 76, 106, 0.0774939), 0px 0.399006px 1.33002px rgba(59, 76, 106, 0.0525061)',
  transition: 'all .15s $authenticMotion',

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
        transform: 'scale(0.95)',
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
  gap: 16,
  overflowX: 'auto',
  position: 'relative',
  margin: '16px 0',
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

export const DescriptionStyled = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',

  p: {
    margin: 0,
    padding: 0,
    fontSize: 13,
    lineHeight: 1.4,
    color: '$gray100',
  },

  code: {
    fontSize: 12,
    backgroundColor: '$gray007',
    border: '1px solid $gray010',
    borderRadius: 2,
    padding: '1px 2px',
  },
});
