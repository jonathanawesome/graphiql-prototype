import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledWorkspaceNavigation = styled('div', {
  display: `flex`,
});

export const StyledWorkspaceNavigationButton = styled('button', {
  position: `relative`,
  height: '100%',
  display: `flex`,
  alignItems: `center`,
  textAlign: `center`,
  padding: `0 ${theme.space[4]}`,
  borderRight: `1px solid ${theme.colors.surface3}`,
  color: theme.colors.text3,
  fontSize: 14,
  // fontWeight: theme.fontWeights.medium,
  whiteSpace: `nowrap`,

  '&::last-of-type': {
    borderRight: `none`,
  },

  '&:hover': {
    backgroundColor: theme.colors.surface2,
  },

  '&:after': {
    content: `none`,
  },

  variants: {
    isActive: {
      true: {
        '&:after': {
          content: ``,
          position: `absolute`,
          bottom: 0,
          left: 0,
          width: `100%`,
          height: 2,
          backgroundColor: theme.colors.green_default,
        },
      },
    },
  },
});
