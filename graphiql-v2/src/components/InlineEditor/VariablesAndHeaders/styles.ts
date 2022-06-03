import { styled, theme } from '../../../theme';

import * as Collapsible from '@radix-ui/react-collapsible';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const CollapsibleRoot = styled(Collapsible.Root, {
  backgroundColor: theme.colors.scale100.value,
  borderTop: `1px solid ${theme.colors.scale400.value}`,
});

export const TabsRoot = styled(TabsPrimitive.Root, {});

export const TabsAndTrigger = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: `8px 30px 8px 12px`,
});

export const TabsList = styled(TabsPrimitive.List, {
  display: 'flex',
  gap: 8,
});

export const TabsTrigger = styled(TabsPrimitive.Trigger, {
  cursor: 'pointer',
  fontSize: theme.fontSizes.body.value,
  lineHeight: theme.fontSizes.body.value,
  fontWeight: theme.fontWeights.medium.value,
  padding: `10px`,
  color: theme.colors.scale700.value,

  '&:hover': { color: theme.colors.scale800.value },
  '&[data-state="active"]': {
    fontWeight: theme.fontWeights.semiBold.value,
    color: theme.colors.scale800.value,
  },

  span: {
    padding: `2px 4px`,
    marginLeft: `4px`,
    borderRadius: `2px`,
    fontSize: theme.fontSizes.mini.value,
    backgroundColor: theme.colors.scale300.value,
    color: theme.colors.scale700.value,
  },
});

export const CollapsibleTrigger = styled(Collapsible.Trigger, {
  all: 'reset',
  cursor: 'pointer',
  marginBottom: 8,
  width: 12,
  height: 12,
});

export const CollapsibleContent = styled(Collapsible.Content, {});

export const TabsContent = styled(TabsPrimitive.Content, {
  padding: `0 16px 16px 16px`,
});

export const VariablesEditor = styled('div', {
  height: 150,
});
