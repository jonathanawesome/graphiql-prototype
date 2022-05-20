import { styled } from '@stitches/react';

import * as Collapsible from '@radix-ui/react-collapsible';
import * as TabsPrimitive from '@radix-ui/react-tabs';

export const TabsList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: 'flex',
  borderBottom: `1px solid red`,
});

export const TabsRoot = styled(TabsPrimitive.Root, {
  // display: 'flex',
  // flexDirection: 'column',
  // width: 300,
  backgroundColor: 'pink',
  // boxShadow: `0 2px 10px black`,
});

export const TabsTrigger = styled(TabsPrimitive.Trigger, {
  backgroundColor: 'BlanchedAlmond',
});

export const TabsContent = styled(TabsPrimitive.Content, {
  backgroundColor: 'PaleTurquoise',
  height: 200,
});

export const CollapsibleContent = styled(Collapsible.Content, {});

export const CollapsibleTrigger = styled(Collapsible.Trigger, {
  marginLeft: 'auto',
});

export const CollapsibleRoot = styled(Collapsible.Root, {
  backgroundColor: `$scale100`,
  borderTop: `1px solid $scale400`,
});

export const TabsAndTrigger = styled('div', {
  display: 'flex',
  padding: `0 12px`,

  span: {
    fontSize: 12,
    lineHeight: 1,
    fontWeight: 500,
    padding: 12,
    display: 'flex',
    alignContent: 'center',
    justifyItems: 'center',
    '&:nth-of-type(2)': {
      color: `$scale700`,
    },
  },

  button: {
    border: 'none',
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    cursor: 'pointer',
    marginLeft: 'auto',

    svg: {
      height: 15,
      width: 15,
    },
  },
});

export const VariablesEditor = styled('div', {
  paddingLeft: 12,
  paddingRight: 12,
});
