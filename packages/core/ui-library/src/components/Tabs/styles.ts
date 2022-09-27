import { styled, theme } from '../../theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as Collapsible from '@radix-ui/react-collapsible';

export const StyledTabsRoot = styled(TabsPrimitive.Root, {
  position: 'relative',
  height: '100%',
  width: '100%',
});

export const StyledCollapsibleRoot = styled(Collapsible.Root, {
  width: '100%',
  backgroundColor: theme.colors.surface1,
  borderTop: `1px solid ${theme.colors.surface3}`,
});

export const StyledCollapsibleTrigger = styled(Collapsible.Trigger, {
  all: 'reset',
  position: 'absolute',
  top: 0,
  right: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  width: theme.space[10],
  height: theme.space[10],

  svg: {
    width: theme.space[4],
    height: theme.space[4],
    path: {
      fill: theme.colors.text4,
    },
  },

  '&:hover': {
    backgroundColor: theme.colors.surface2,
    svg: {
      path: {
        fill: theme.colors.text1,
      },
    },
  },

  variants: {
    isOpen: {
      true: {
        transform: 'rotate(180deg)',
      },
    },
  },
});

export const StyledCollapsibleContent = styled(Collapsible.Content, {});
