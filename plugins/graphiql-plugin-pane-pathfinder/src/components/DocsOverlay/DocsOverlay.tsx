import { useEffect } from 'react';

// components
import { Close } from '@graphiql-v2-prototype/graphiql-ui-library';

// hooks
import { Docs, useDocs } from '@graphiql-v2-prototype/graphiql-plugin-pane-docs';

// styles
import { DocsOverlayStyled, CloseButton } from './styles';

export const DocsOverlay = () => {
  const { getDocsInstance, resetDocInstance } = useDocs();

  const docsInstance = getDocsInstance({ placement: 'PATHFINDER' });

  // console.log('DocsOverlay', {
  //   docsInstance,
  // });

  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        resetDocInstance({ placement: 'PATHFINDER' });
      }
    };

    window.addEventListener('keydown', close);

    return () => window.removeEventListener('keydown', close);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DocsOverlayStyled overlayVisible={!!docsInstance?.activeDocPane}>
      <Docs placement="PATHFINDER" />
      <CloseButton onClick={() => resetDocInstance({ placement: 'PATHFINDER' })}>
        <Close />
      </CloseButton>
    </DocsOverlayStyled>
  );
};
