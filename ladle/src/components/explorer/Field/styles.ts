import { styled } from '@stitches/react';
// import { theme } from '@/theme';

import * as Collapsible from '@radix-ui/react-collapsible';

export const Content = styled(Collapsible.Content, {
  marginLeft: 20,
  // borderLeft: `1px solid red`,
});

export const ChildFields = styled('div', {
  borderLeft: `1px solid $scale400`,
  // marginTop: 8,
  marginLeft: 7,
  paddingLeft: 12,
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
  alignItems: 'flex-start',
  gap: 6,
  // paddingBottom: 12,

  variants: {
    isCollapsible: {
      true: {
        gridTemplateColumns: '15px 15px 1fr',
      },
    },
  },
});

export const Trigger = styled(Collapsible.Trigger, {
  marginTop: 1,
});

export const Root = styled(Collapsible.Root, {
  position: 'relative',
  marginTop: 8,

  variants: {
    offset: {
      true: {
        // paddingLeft: 12,
      },
    },
  },
});
