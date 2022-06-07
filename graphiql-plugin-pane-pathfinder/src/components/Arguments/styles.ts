import { styled } from '@graphiql-v2-prototype/graphiql-v2';

import * as Collapsible from '@radix-ui/react-collapsible';

export const OptionalArgs = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const Content = styled(Collapsible.Content, {
  // marginLeft: 12,
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
});

export const Trigger = styled(Collapsible.Trigger, {});

export const Root = styled(Collapsible.Root, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});
