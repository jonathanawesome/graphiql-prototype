import { styled } from '@graphiql-prototype/graphiql-ui-library';

import * as Collapsible from '@radix-ui/react-collapsible';
import * as Tabs from '@radix-ui/react-tabs';

export const CollapsibleRoot = styled(Collapsible.Root, {
  backgroundColor: 'white',
  borderTop: '1px solid $gray015',
});

export const TabsRoot = styled(Tabs.Root, {});

export const TabsAndTrigger = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 24px 8px 4px',
});

export const TabsList = styled(Tabs.List, {
  display: 'flex',
  gap: 8,
});

export const TabsTrigger = styled(Tabs.Trigger, {
  cursor: 'pointer',
  fontSize: '$body',
  lineHeight: '$body',
  fontWeight: '$medium',
  padding: '10px',
  color: '$gray060',

  '&:hover': { color: '$gray100' },
  '&[data-state="active"]': {
    fontWeight: '$semiBold',
    color: '$gray100',
  },

  span: {
    padding: '2px 4px',
    marginLeft: '4px',
    borderRadius: '2px',
    fontSize: '$mini',
    backgroundColor: '$gray015',
    color: '$gray060',
  },
});

export const CollapsibleTrigger = styled(Collapsible.Trigger, {
  all: 'reset',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  width: 16,
  height: 16,

  svg: {
    path: {
      fill: '$gray040',
    },
  },

  variants: {
    isOperationToolsOpen: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
});

export const CollapsibleContent = styled(Collapsible.Content, {});

export const TabsContent = styled(Tabs.Content, {
  // padding: '0 16px 16px 16px',
});
