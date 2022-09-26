import { styled, theme } from '../../theme';

export const StyledTag = styled('span', {
  display: 'flex',
  alignItems: `center`,
  justifyContent: `center`,
  fontWeight: theme.fontWeights.medium,
  fontSize: 9,
  lineHeight: 1,
  padding: 1,
  borderRadius: 2,
  minWidth: 12,
  height: 16,

  variants: {
    type: {
      ERROR: {
        border: `1px solid ${theme.colors.red_light}`,
        backgroundColor: theme.colors.red_lightest,
        color: theme.colors.red_default,
      },
      SUCCESS: {
        border: `1px solid ${theme.colors.green_light}`,
        backgroundColor: theme.colors.green_lightest,
        color: theme.colors.green_default,
      },
      WARNING: {
        border: `1px solid ${theme.colors.orange_light}`,
        backgroundColor: theme.colors.orange_lightest,
        color: theme.colors.orange_default,
      },
      INFO: {
        border: `1px solid ${theme.colors.blue_light}`,
        backgroundColor: theme.colors.blue_lightest,
        color: theme.colors.blue_default,
      },
      OPERATION: {
        border: `1px solid ${theme.colors.surface3}`,
        backgroundColor: `transparent`,
        color: theme.colors.green_default,
      },
    },
  },
});
