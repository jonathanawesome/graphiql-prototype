import { keyframes, styled, theme } from '../../theme';

import * as DialogPrimitive from '@radix-ui/react-dialog';

export const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const Root = styled(DialogPrimitive.Root, {
  backgroundColor: '#00000030',
  position: 'fixed',
  zIndex: 2,
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

export const Trigger = styled(DialogPrimitive.Trigger, {
  svg: {
    path: {
      // TODO 👇 this is going to break some icons using both fill and stroke
      fill: theme.colors.surface2,
      stroke: theme.colors.surface2,
    },
  },
  '&:hover': {
    svg: {
      path: {
        // TODO 👇 this is going to break some icons using both fill and stroke
        fill: theme.colors.pink_default,
        stroke: theme.colors.pink_default,
      },
    },
  },
});

export const Portal = styled(DialogPrimitive.Portal, {});

export const CloseWrap = styled(DialogPrimitive.Close, {});

export const Overlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '#00000030',
  position: 'fixed',
  zIndex: 2,
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

export const ContentWrap = styled(DialogPrimitive.Content, {
  // backgroundColor: 'pink',
  backgroundColor: theme.colors.surface3,
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  zIndex: 3,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  '&:focus': { outline: 'none' },
});

export const Content = styled('div', {
  padding: '12px 24px',
});

export const DialogLead = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px 24px',
  borderBottom: '1px solid $gray015',
  fontSize: 16,
  fontWeight: '$medium',
  color: theme.colors.text1,

  button: {
    display: 'flex',
    svg: {
      width: 20,
      height: 20,
      path: {
        fill: '$gray060',
      },
    },
    '&:hover': {
      svg: {
        path: {
          fill: '$gray100',
        },
      },
    },
  },
});
