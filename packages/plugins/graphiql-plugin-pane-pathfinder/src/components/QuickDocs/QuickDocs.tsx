import { useEffect, useState } from 'react';

// components
import { TertiaryPane } from '@graphiql-prototype/graphiql-plugin-schema-documentation';

// hooks
import { useSchemaReference } from '@graphiql-prototype/graphiql-plugin-schema-documentation';

// styles
import {
  CustomPortalContainer,
  DialogContent,
  DialogPortal,
  DialogRoot,
  StyledQuickDocs,
} from './styles';

export const QuickDocs = () => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const { activeTertiaryPane, clearTertiaryPaneStack } = useSchemaReference();

  // console.log('QuickDocs', {
  //   activeTertiaryPane,
  // });

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
    <StyledQuickDocs dialogActive={!!activeTertiaryPane}>
      <DialogRoot open={!!activeTertiaryPane} modal={true}>
        <DialogPortal container={container}>
          <DialogContent
            onEscapeKeyDown={() => closeDialog()}
            onPointerDownOutside={() => closeDialog()}
          >
            {activeTertiaryPane && <TertiaryPane pane={activeTertiaryPane['pane']} />}
          </DialogContent>
        </DialogPortal>
      </DialogRoot>
      <CustomPortalContainer ref={setContainer} />
    </StyledQuickDocs>
  );
};
