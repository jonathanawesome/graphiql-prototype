import { styled } from '@stitches/react';
// import { theme } from '@/theme';

import * as Collapsible from '@radix-ui/react-collapsible';

export const ChildFields = styled('div', {
  borderLeft: `1px solid $scale100`,
  // marginLeft: 8,
  // paddingLeft: 12,
});

export const Content = styled(Collapsible.Content, {
  marginLeft: 20,
});

export const Trigger = styled(Collapsible.Trigger, {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '15px 1fr',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 6,
  cursor: 'pointer',
});

export const Root = styled(Collapsible.Root, {
  position: 'relative',

  variants: {
    offset: {
      true: {
        // paddingLeft: 12,
      },
    },
  },
});
