import { useEffect, useState } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';

// components
import { TertiaryPane } from '@graphiql-prototype/graphiql-plugin-schema-documentation';

// hooks
import { useSchemaReference } from '@graphiql-prototype/graphiql-plugin-schema-documentation';

// styles
import {
  // CustomPortalContainer,
  // DialogContent,
  // DialogPortal,
  // DialogRoot,
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
    <div className={StyledQuickDocs({ dialogActive: !!activeTertiaryPane })}>
      <DialogPrimitive.Root open={!!activeTertiaryPane} modal={true}>
        <DialogPrimitive.Portal container={container}>
          <DialogPrimitive.Content
            className="quick-docs-dialog-content"
            onEscapeKeyDown={() => closeDialog()}
            onPointerDownOutside={() => closeDialog()}
          >
            {activeTertiaryPane && <TertiaryPane pane={activeTertiaryPane['pane']} />}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
      <div className="quick-docs-portal-container" ref={setContainer} />
    </div>
  );
};
