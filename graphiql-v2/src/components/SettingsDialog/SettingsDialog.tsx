import { useRef } from 'react';
import { styled, keyframes } from '@stitches/react';

/** components */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Close, Gear } from '../index';

/** hooks */
import { useGraphiQL } from '../../hooks';

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '#00000030',
  position: 'fixed',
  zIndex: 2,
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});

const ContentWrap = styled(DialogPrimitive.Content, {
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

const Content = styled('div', {
  padding: 24,
});

const DialogLead = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: `16px 24px`,
  borderBottom: `1px solid $scale500`,

  svg: {
    width: 24,
    height: 24,
  },
});

export const SettingsDialog = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { createFetcher } = useGraphiQL();

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      createFetcher({ url: inputRef.current.value });
    }
  };

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        <button>
          <Gear />
        </button>
      </DialogPrimitive.Trigger>
      <StyledOverlay />
      <DialogPrimitive.Portal>
        <ContentWrap>
          <DialogLead>
            <span>Settings</span>
            <DialogPrimitive.Close>
              <Close />
            </DialogPrimitive.Close>
          </DialogLead>
          <Content>
            <form>
              <label>
                Remote URL
                <input type="text" ref={inputRef} />
              </label>
              <button type="submit" onClick={(e) => handleSubmit(e)}>
                submit
              </button>
            </form>
          </Content>
        </ContentWrap>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
