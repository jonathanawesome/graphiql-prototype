import { styled } from '@stitches/react';

import { theme } from '@graphiql-v2-prototype/graphiql-v2';

import * as Collapsible from '@radix-ui/react-collapsible';

export const Trigger = styled(Collapsible.Trigger, {
  display: 'flex',
  alignContent: 'center',
  gap: 3,
  cursor: 'pointer',
  userSelect: 'none',

  '& span': {
    color: theme.colors.scale800.value,
    fontSize: theme.fontSizes.body.value,
    fontWeight: theme.fontWeights.semiBold.value,
  },
});

export const Content = styled(Collapsible.Content, {
  position: 'relative',
  paddingTop: 8,
  paddingLeft: 10,
  marginLeft: 7,
  borderLeft: `1px solid ${theme.colors.scale400.value}`,
});

export const Root = styled(Collapsible.Root, {
  marginBottom: 24,
});
