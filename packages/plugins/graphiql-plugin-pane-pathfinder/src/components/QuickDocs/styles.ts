import { styled, theme } from '@graphiql-prototype/ui-library';

import * as DialogPrimitive from '@radix-ui/react-dialog';

export const StyledQuickDocs = styled('div', {
  backgroundColor: theme.colors.surface1,
  position: 'absolute',
  top: 0,
  left: 0,
  overflowY: 'auto',
  height: '100%',
  width: '100%',
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
      fill: theme.colors.text4,
    },
  },

  '&:hover': {
    svg: {
      path: {
        fill: theme.colors.text2,
      },
    },
  },
});

export const DialogRoot = styled(DialogPrimitive.Root, {});

export const DialogPortal = styled(DialogPrimitive.Portal, {});

export const DialogClose = styled(DialogPrimitive.Close, {
  // '&:focus': {
  //   outline: `2px solid red`,
  // },
});

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
