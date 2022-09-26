import { styled, theme } from '../../theme';

export const StyledMessage = styled('div', {
  borderRadius: theme.space[1],
  padding: theme.space[3],
  fontSize: 13,
  lineHeight: 1.5,

  variants: {
    variant: {
      ERROR: {
        color: theme.colors.red_default,
        border: `1px solid ${theme.colors.red_light}`,
        backgroundColor: theme.colors.red_lightest,
      },
      WARNING: {
        color: theme.colors.orange_default,
        border: `1px solid ${theme.colors.orange_light}`,
        backgroundColor: theme.colors.orange_lightest,
      },
      INFO: {
        color: theme.colors.blue_default,
        border: `1px solid ${theme.colors.blue_light}`,
        backgroundColor: theme.colors.blue_lightest,
      },
      SUCCESS: {
        color: theme.colors.green_default,
        border: `1px solid ${theme.colors.green_light}`,
        backgroundColor: theme.colors.green_lightest,
      },
    },
  },
});
