import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

//TODO: this is mostly placeholder styling...just getting something on the screen
export const NavigationStyled = styled('div', {
  height: '100%',
  padding: '24px 19px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRight: 'solid 1px transparent',

  variants: {
    showBorder: {
      true: {
        borderRight: 'solid 1px $scale400',
      },
    },
  },
});

export const PanePluginNavigation = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});

export const PanePluginNavigationItem = styled('button', {
  '&:hover': {
    svg: {
      path: {
        fill: '$accentArgument',
      },
    },
  },

  variants: {
    isActive: {
      true: {
        svg: {
          path: {
            fill: '$accentArgument',
          },
        },
      },
    },
  },
});

export const SibebarPlugins = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
});
