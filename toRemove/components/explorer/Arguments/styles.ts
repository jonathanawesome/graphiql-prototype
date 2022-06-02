import { styled } from '@stitches/react';
// import { theme } from '@/theme';

import * as Collapsible from '@radix-ui/react-collapsible';

export const OptionalArgs = styled('div', {
  variants: {
    isOpen: {
      true: {
        // backgroundColor: 'Red',
        // margin: `8px 0`,
      },
    },
  },
});

export const Content = styled(Collapsible.Content, {
  // marginLeft: 12,
});

export const Trigger = styled(Collapsible.Trigger, {});

export const Root = styled(Collapsible.Root, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: `8px 0`,
});
