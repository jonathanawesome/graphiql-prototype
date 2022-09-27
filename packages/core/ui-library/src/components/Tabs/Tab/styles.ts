import { styled, theme } from '../../../theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';

export const TabWrap = styled('div', {
  position: `relative`,
  backgroundColor: theme.colors.surface1,

  '&:hover': {
    backgroundColor: theme.colors.surface2,
  },
});

export const Trigger = styled(TabsPrimitive.Trigger, {
  all: 'reset',
  cursor: 'pointer',
  fontSize: theme.fontSizes.body,
  lineHeight: theme.fontSizes.body,
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
  height: theme.space[10],
  color: theme.colors.text2,

  '&[data-state="active"]': {
    '&:after': {
      content: '',
      position: 'absolute',
      bottom: -1,
      left: 0,
      height: 2,
      width: '100%',
      backgroundColor: theme.colors.green_default,
    },
  },

  variants: {
    hasRemoveTabButton: {
      true: {
        paddingRight: theme.space[9],
      },
    },
  },
});