import { styled } from '@stitches/react';

import * as Collapsible from '@radix-ui/react-collapsible';

export const Content = styled(Collapsible.Content, {});

export const Trigger = styled(Collapsible.Trigger, {});

export const Root = styled(Collapsible.Root, {});

export const InputTypeChildArguments = styled('div', {
  borderLeft: `1px solid $scale100`,
  paddingLeft: 16,
  marginLeft: 7,
});
