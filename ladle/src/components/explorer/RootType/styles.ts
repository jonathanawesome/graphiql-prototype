import { styled } from '@stitches/react';

import * as Collapsible from '@radix-ui/react-collapsible';

export const Trigger = styled(Collapsible.Trigger, {
  display: 'flex',
  alignContent: 'center',
  gap: 3,
  cursor: 'pointer',
  userSelect: 'none',

  '& span': {
    color: `$scale800`,
    fontSize: '$body',
    fontWeight: `$semiBold`,
  },
});

export const Content = styled(Collapsible.Content, {
  position: 'relative',
  paddingTop: 8,
  paddingLeft: 10,
  marginLeft: 7,
  borderLeft: '1px solid $scale400',
});

export const Root = styled(Collapsible.Root, {});
