import { styled, theme } from '../../../theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';

export const StyledTabsList = styled(TabsPrimitive.List, {
  display: 'flex',

  variants: {
    isCollapsible: {
      true: {
        paddingRight: theme.space[10],
      },
    },
  },
});
