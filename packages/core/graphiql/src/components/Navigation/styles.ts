import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledPanePluginNavigation = styled('div', {
  width: `100%`,
  display: 'flex',
  flexDirection: `column`,
  borderRight: `solid 1px ${theme.colors.surface3}`,
});

export const StyledPanePluginNavigationItem = styled('button', {
  flexShrink: 0,

  padding: 18,
  height: 60,
  width: 60,

  '&:hover': {
    svg: {
      path: {
        fill: theme.colors.pink_default,
      },
    },
  },

  variants: {
    isActive: {
      true: {
        svg: {
          path: {
            fill: theme.colors.pink_default,
          },
        },
      },
      false: {
        svg: {
          path: {
            fill: theme.colors.text4,
          },
        },
      },
    },
  },
});

export const StyledSettingsButtonWrap = styled('div', {
  marginTop: `auto`,
  button: {
    height: '100%',
    // borderLeft: `1px solid ${theme.colors.surface3}`,
    // hairlineL: theme.colors.surface3,
  },
});
