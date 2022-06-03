import { styled } from '@stitches/react';
import { theme } from '@graphiql-v2-prototype/graphiql-v2';

import * as Collapsible from '@radix-ui/react-collapsible';

export const Content = styled(Collapsible.Content, {});

export const Trigger = styled(Collapsible.Trigger, {});

export const Root = styled(Collapsible.Root, {});

export const TriggerWrap = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '15px 1fr',
  alignItems: 'flex-start',
  gap: 6,

  variants: {
    isCollapsible: {
      true: {
        gridTemplateColumns: '15px 15px 1fr',
      },
    },
  },
});

export const InputFields = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  borderLeft: `1px solid ${theme.colors.accentArgument.value}`,
  paddingLeft: 16,
  marginTop: 12,
  marginLeft: 7,
});
