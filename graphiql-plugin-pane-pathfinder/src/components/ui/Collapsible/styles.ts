import { styled } from '@graphiql-v2-prototype/graphiql-v2';
import * as Collapsible from '@radix-ui/react-collapsible';
import { SharedLeadGrid } from '../shared';

export const Root = styled(Collapsible.Root, {
  position: 'relative',
});

export const Lead = styled('div', {
  ...SharedLeadGrid,

  variants: {
    hasToggler: {
      true: {
        gridTemplateColumns: '15px 15px 1fr',
      },
    },
  },
});

export const Trigger = styled(Collapsible.Trigger, {
  height: 15,
  width: 15,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Content = styled(Collapsible.Content, {
  marginLeft: 20,
});
