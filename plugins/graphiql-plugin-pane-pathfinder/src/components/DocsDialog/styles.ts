import { styled } from '@graphiql-prototype/graphiql-ui-library';

import * as DialogPrimitive from '@radix-ui/react-dialog';

export const DocsDialogStyled = styled('div', {
  backgroundColor: '$gray007',
  position: 'absolute',
  top: 0,
  left: 0,
  overflowY: 'auto',
  height: '100%',
  width: '100%',
  borderRadius: 12,
  transition: 'all .1s $authenticMotion',

  variants: {
    dialogActive: {
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

export const DialogRoot = styled(DialogPrimitive.Root, {});

export const DialogPortal = styled(DialogPrimitive.Portal, {});

const DialogTitle = styled(DialogPrimitive.Title, {});

const DialogDescription = styled(DialogPrimitive.Description, {});

export const DialogClose = styled(DialogPrimitive.Close, {});

export const DialogContent = styled(DialogPrimitive.Content, {
  position: 'absolute',
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
});

export const CustomPortalContainer = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
});
