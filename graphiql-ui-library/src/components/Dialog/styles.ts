import { keyframes, styled } from '../../theme';

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
  '&:hover': {
    svg: {
      path: {
        // TODO 👇 this is going to break some icons
        fill: '$accentArgument',
        stroke: '$accentArgument',
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
  backgroundColor: 'white',
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

export const Button = styled('button', {
  svg: {
    width: 20,
    height: 20,
  },
});

export const DialogLead = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 24px',
  borderBottom: '1px solid $scale500',
  fontSize: 14,
  color: '$scale800',

  svg: {
    width: 20,
    height: 20,
  },
});
