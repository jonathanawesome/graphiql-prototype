import { styled } from '@graphiql-v2-prototype/graphiql-v2';
import * as Collapsible from '@radix-ui/react-collapsible';

export const Root = styled(Collapsible.Root, {
  position: 'relative',
  padding: `8px 0 0`,
});

export const Lead = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '15px 1fr',
  alignItems: 'flex-start',
  gap: 6,

  variants: {
    hasToggler: {
      true: {
        gridTemplateColumns: `15px 15px 1fr`,
      },
    },
  },
});

export const Trigger = styled(Collapsible.Trigger, {});

export const Content = styled(Collapsible.Content, {
  marginLeft: 20,
});
