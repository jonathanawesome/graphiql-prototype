import { useState } from 'react';

// components
import { Button, ButtonTypes } from '../Button';
import { Dialog as Dialog_Headless } from '@headlessui/react';

// styles
import { StyledDialog } from './styles';

type DialogProps = {
  button: ButtonTypes;
};

export const Dialog = ({ button }: DialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <Button action={() => setIsOpen(true)} {...button} />
      <Dialog_Headless
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className={StyledDialog()}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <Dialog_Headless.Panel>
            <Dialog_Headless.Title>Complete your order</Dialog_Headless.Title>
            <div>dialog content</div>

            <button onClick={() => setIsOpen(false)}>Close</button>
          </Dialog_Headless.Panel>
        </div>
      </Dialog_Headless>
    </>
  );
};
