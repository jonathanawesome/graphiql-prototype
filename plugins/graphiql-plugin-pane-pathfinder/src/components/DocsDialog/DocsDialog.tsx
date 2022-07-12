import { useEffect, useState } from 'react';

// components
import { Close } from '@graphiql-prototype/graphiql-ui-library';

// hooks
import { Docs, useDocs } from '@graphiql-prototype/graphiql-plugin-pane-docs';

// styles
import {
  CloseButton,
  CustomPortalContainer,
  DialogClose,
  DialogContent,
  DialogPortal,
  DialogRoot,
  DocsDialogStyled,
} from './styles';

export const DocsDialog = ({ dialogActive }: { dialogActive: boolean }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const { getDocsInstance, resetDocInstance } = useDocs();

  const docsInstance = getDocsInstance({ placement: 'PATHFINDER' });

  // console.log('DocsDialog', {
  //   docsInstance,
  // });

  const closeDialog = () => resetDocInstance({ placement: 'PATHFINDER' });

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDialog();
      }
    };

    window.addEventListener('keydown', close);

    return () => window.removeEventListener('keydown', close);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DocsDialogStyled dialogActive={!!docsInstance?.activeDocPane}>
      <DialogRoot open={dialogActive}>
        <DialogPortal container={container}>
          <DialogContent
            onEscapeKeyDown={() => closeDialog()}
            onPointerDownOutside={() => closeDialog()}
          >
            {/*
            // TODO: populate and wrap with visually hidden
            <DialogTitle>Title</DialogTitle>
              <DialogDescription>
               Description
              </DialogDescription> */}
            <Docs placement="PATHFINDER" />
            <DialogClose asChild>
              <CloseButton onClick={() => closeDialog()}>
                <Close />
              </CloseButton>
            </DialogClose>
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
      <CustomPortalContainer ref={setContainer} />
    </DocsDialogStyled>
  );
};
