import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledPanePluginContainerWrap = css({
  height: '100%',
  width: '100%',
  position: 'relative',
  display: `grid`,
  gridTemplateRows: `${theme.space[12]} minmax(0, 1fr)`,
});

export const StyledPanePluginContainer = css({
  height: '100%',

  variants: {
    isActive: {
      true: { opacity: 1, visibility: 'visible' },
      false: { opacity: 0, visibility: 'hidden' },
    },
  },
});

export const StyledPanePluginNavigation = css({
  width: `100%`,
  display: 'flex',
  // gap: 10,
  borderBottom: `solid 1px ${theme.colors.surface3}`,
  // hairlineB: theme.colors.surface3,
});

export const StyledPanePluginNavigationItem = css({
  flexShrink: 0,

  padding: 13,
  height: 48,
  width: 48,

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

export const StyledSettingsButtonWrap = css({
  marginLeft: `auto`,
  button: {
    height: '100%',
    borderLeft: `1px solid ${theme.colors.surface3}`,
    // hairlineL: theme.colors.surface3,
  },
});
