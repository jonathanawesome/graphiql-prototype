// styles
import { useState } from 'react';
import { Dialog as HeadlessDialog } from '@headlessui/react';

import { StyledDialog, StyledDialogPanel, StyledDialogTitle } from './styles';

export const Dialog = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <HeadlessDialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className={StyledDialog()}
    >
      <HeadlessDialog.Panel>
        <HeadlessDialog.Title>Complete your order</HeadlessDialog.Title>
        dialog content
      </HeadlessDialog.Panel>
    </HeadlessDialog>
  );
};
