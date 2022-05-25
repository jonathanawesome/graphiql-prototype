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

export const IndicatorWrap = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    height: 15,
    width: 15,
  },

  variants: {
    isActive: {
      false: {
        svg: {
          transform: `scale(0.85)`,
        },
      },
    },
  },
});

export const TriggerWrap = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '15px 1fr',
  alignItems: 'center',
  gap: 6,

  variants: {
    isCollapsible: {
      true: {
        gridTemplateColumns: '15px 15px 1fr',
      },
    },
  },
});

export const Trigger = styled(Collapsible.Trigger, {
  // width: '100%',
  // display: 'grid',
  // gridTemplateColumns: '15px 1fr',
  // alignItems: 'center',
  // gap: 6,
  // cursor: 'pointer',
});

export const Root = styled(Collapsible.Root, {
  position: 'relative',
  padding: `8px 0`,

  variants: {
    offset: {
      true: {
        // paddingLeft: 12,
      },
    },
  },
});
