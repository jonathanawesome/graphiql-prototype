import { styled, theme } from '../../../theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';

export const StyledTabsList = styled(TabsPrimitive.List, {
  display: 'flex',
  borderBottom: `1px solid ${theme.colors.surface3}`,

  variants: {
    isCollapsible: {
      true: {
        paddingRight: theme.space[10],
      },
    },
  },
});
