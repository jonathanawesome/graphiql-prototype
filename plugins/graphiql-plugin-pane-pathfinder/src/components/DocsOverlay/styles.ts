import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const DocsOverlayStyled = styled('div', {
  padding: 24,
  height: 'calc(100% - 12px)',
  width: 'calc(100% - 32px)',
  position: 'absolute',
  top: 12,
  left: 24,
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

export const CloseButton = styled('button', {
  height: 24,
  width: 24,
  position: 'absolute',
  top: 20,
  right: 20,

  svg: {
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
