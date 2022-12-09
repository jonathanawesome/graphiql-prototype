import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledQuickDocs = css({
  backgroundColor: theme.colors.surface1,
  position: 'absolute',
  top: 0,
  left: 0,
  overflowY: 'auto',
  height: '100%',
  width: '100%',
  transition: 'all .1s $authenticMotion',

  '& .quick-docs-portal-container': {
    position: 'relative',
    height: '100%',
    width: '100%',
  },

  '& .quick-docs-dialog-root': {
    position: 'relative',
    height: '100%',
    width: '100%',
  },

  '& .quick-docs-dialog-content': {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },

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

// export const DialogRoot = styled(DialogPrimitive.Root, {});

// export const DialogPortal = styled(DialogPrimitive.Portal, {});

// export const DialogClose = styled(DialogPrimitive.Close, {
//   // '&:focus': {
//   //   outline: `2px solid red`,
//   // },
// });

// export const DialogContent = styled(DialogPrimitive.Content, {
//   position: 'absolute',
//   top: 0,
//   left: 0,
//   height: '100%',
//   width: '100%',
// });

// export const CustomPortalContainer = styled('div', {
//   position: 'relative',
//   height: '100%',
//   width: '100%',
// });
