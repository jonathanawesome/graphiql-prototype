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
  // borderRight: `1px solid ${theme.colors.surface3}`,
  hairlineR: theme.colors.surface3,
  color: theme.colors.text3,
  fontSize: 14,
  // fontWeight: theme.fontWeights.medium,
  whiteSpace: `nowrap`,

  '&::last-of-type': {
    boxShadow: `none`,
  },

  '&:hover': {
    backgroundColor: theme.colors.surface2,
    height: `calc(100% - 1px)`,
    paddingTop: 1,
  },

  '&:after': {
    content: `none`,
  },

  variants: {
    isActive: {
      true: {
        '&:hover': {
          height: `100%`,
          paddingTop: 0,
        },
        '&:after': {
          content: ``,
          position: `absolute`,
          bottom: -1,
          left: 0,
          width: `100%`,
          height: 2,
          backgroundColor: theme.colors.green_default,
        },
      },
    },
  },
});
