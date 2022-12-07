import { css, theme } from '../../../theme';

export const StyledTabsList = css({
  all: `unset`,
  height: theme.space[10],
  display: 'flex',
  hairlineB: theme.colors.surface3,

  variants: {
    isCollapsible: {
      true: {
        paddingRight: theme.space[10],
      },
    },
  },
});
