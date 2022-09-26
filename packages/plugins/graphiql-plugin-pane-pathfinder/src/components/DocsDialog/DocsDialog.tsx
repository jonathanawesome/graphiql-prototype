import { useEffect, useState } from 'react';

// components
// import { Close } from '@graphiql-prototype/ui-library';
import { TertiaryPane } from '@graphiql-prototype/graphiql-plugin-schema-documentation';

// hooks
// import { Docs, useDocs } from '@graphiql-prototype/graphiql-plugin-pane-docs';
import { useSchemaReference } from '@graphiql-prototype/graphiql-plugin-schema-documentation';

// styles
import {
  // CloseButton,
  CustomPortalContainer,
  // DialogClose,
  DialogContent,
  DialogPortal,
  DialogRoot,
  DocsDialogStyled,
} from './styles';

export const DocsDialog = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  // const { getDocsInstance, resetDocInstance } = useDocs();

  // const docsInstance = getDocsInstance({ placement: 'PATHFINDER' });

  const { activeTertiaryPane, clearTertiaryPaneStack } = useSchemaReference();

  console.log('DocsDialog', {
    activeTertiaryPane,
  });

  const closeDialog = () => clearTertiaryPaneStack();

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
    <DocsDialogStyled dialogActive={!!activeTertiaryPane}>
      <DialogRoot open={!!activeTertiaryPane} modal={true}>
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
            {/* <Docs placement="PATHFINDER" /> */}
            {activeTertiaryPane && <TertiaryPane pane={activeTertiaryPane['pane']} />}
            {/* <DialogClose asChild>
              <CloseButton onClick={() => closeDialog()}>
                <Close />
              </CloseButton>
            </DialogClose> */}
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
      <CustomPortalContainer ref={setContainer} />
    </DocsDialogStyled>
  );
};
