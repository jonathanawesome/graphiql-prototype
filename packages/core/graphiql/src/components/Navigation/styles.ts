import { styled, theme } from '@graphiql-prototype/ui-library';

//TODO: this is mostly placeholder styling...just getting something on the screen
export const NavigationStyled = styled('div', {
  height: '100%',
  padding: `${theme.space[6]} ${theme.space[3]}`,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRight: `solid 1px ${theme.colors.surface3}`,

  button: {
    padding: 7,
    height: 35,
    width: 35,
  },
});

export const PanePluginNavigation = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
});

export const PanePluginNavigationItem = styled('button', {
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
