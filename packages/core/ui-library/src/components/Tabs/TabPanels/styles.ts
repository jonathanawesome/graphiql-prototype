import { styled, theme } from '../../../theme';

import * as TabsPrimitive from '@radix-ui/react-tabs';

export const StyledTabPanels = styled(TabsPrimitive.Content, {
  padding: theme.space[4],
  // padding: `0 ${theme.space[4]} ${theme.space[4]} ${theme.space[4]}`,
  height: '100%',
});
