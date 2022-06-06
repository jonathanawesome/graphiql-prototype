import { styled } from '../../../theme';

import * as Collapsible from '@radix-ui/react-collapsible';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const CollapsibleRoot = styled(Collapsible.Root, {
  backgroundColor: '$scale100',
  borderTop: '1px solid $scale400',
});

export const TabsRoot = styled(TabsPrimitive.Root, {});

export const TabsAndTrigger = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '8px 24px 8px 12px',
});

export const TabsList = styled(TabsPrimitive.List, {
  display: 'flex',
  gap: 8,
});

export const TabsTrigger = styled(TabsPrimitive.Trigger, {
  cursor: 'pointer',
  fontSize: '$body',
  lineHeight: '$body',
  fontWeight: '$medium',
  padding: '10px',
  color: '$scale700',

  '&:hover': { color: '$scale800' },
  '&[data-state="active"]': {
    fontWeight: '$semiBold',
    color: '$scale800',
  },

  span: {
    padding: '2px 4px',
    marginLeft: '4px',
    borderRadius: '2px',
    fontSize: '$mini',
    backgroundColor: '$scale300',
    color: '$scale700',
  },
});

export const CollapsibleTrigger = styled(Collapsible.Trigger, {
  all: 'reset',
  boxSizing: 'border-box',
  cursor: 'pointer',
  marginBottom: 8,
  width: 12,
  height: 12,
});

export const CollapsibleContent = styled(Collapsible.Content, {});

export const TabsContent = styled(TabsPrimitive.Content, {
  padding: '0 16px 16px 16px',
});

export const VariablesEditor = styled('div', {
  height: 150,
});
