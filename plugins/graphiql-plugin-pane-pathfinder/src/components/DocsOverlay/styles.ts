import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const DocsOverlayStyled = styled('div', {
  padding: 24,
  // margin: 24,
  height: 'calc(100% - 16px)',
  width: 'calc(100% - 16px)',
  // height: '100%',
  // width: '100%',
  position: 'absolute',
  top: 8,
  left: 8,
  overflowY: 'auto',
  backgroundColor: '$white',
  border: '1px solid $gray015',
  borderRadius: 12,
  boxShadow:
    '0px 4px 12px rgba(59, 76, 106, 0.13), 0px 1px 5px rgba(59, 76, 106, 0.0774939), 0px 1px 2px rgba(59, 76, 106, 0.0525061)',
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
        transform: 'scale(0.96)',
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
