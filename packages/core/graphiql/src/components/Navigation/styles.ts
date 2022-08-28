import { styled } from '@graphiql-prototype/ui-library';

//TODO: this is mostly placeholder styling...just getting something on the screen
export const NavigationStyled = styled('div', {
  height: '100%',
  padding: '24px 12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRight: 'solid 1px transparent',

  button: {
    padding: 7,
    height: 35,
    width: 35,
  },

  variants: {
    showBorder: {
      true: {
        borderRight: 'solid 1px $gray015',
      },
    },
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
        fill: '$primary100',
      },
    },
  },

  variants: {
    isActive: {
      true: {
        svg: {
          path: {
            fill: '$primary100',
          },
        },
      },
      false: {
        svg: {
          path: {
            fill: '$gray040',
          },
        },
      },
    },
  },
});
