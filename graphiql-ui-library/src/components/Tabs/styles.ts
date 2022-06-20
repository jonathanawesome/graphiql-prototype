import { styled } from '../../theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';

export const TabsRoot = styled(TabsPrimitive.Root, {
  height: '100%',
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

export const TabsContent = styled(TabsPrimitive.Content, {
  padding: '0 16px 16px 16px',
  height: '100%',
});
