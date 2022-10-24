import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledOperationActions = styled('div', {
  display: 'flex',
  // flexDirection: ``,
  gap: theme.space[4],
  // width: theme.space[10],
  // minWidth: theme.space[10],
});

export const StyledPlayButtonType = styled('span', {
  fontSize: 12,
  fontWeight: theme.fontWeights.medium,
  color: theme.colors.text3,
});

export const StyledPlayButton = styled('button', {
  all: `unset`,
  cursor: 'pointer',
  userSelect: `none`,
  margin: 0,
  padding: 0,
  height: theme.space[7],
  display: 'flex',
  alignItems: `center`,
  gap: theme.space[2],
  border: `1px solid ${theme.colors.surface3}`,
  borderRadius: 4,
  paddingRight: 8,
  paddingLeft: 8,

  '& svg': {
    height: theme.space[2],
    width: theme.space[2],
    path: {
      fill: theme.colors.text3,
    },
  },

  '&:hover': {
    border: `1px solid transparent`,
    backgroundColor: theme.colors.surface3,

    span: {
      color: theme.colors.text1,
    },
    '& svg': {
      path: {
        fill: theme.colors.text1,
      },
    },
  },
});

export const StyledPrettierButton = styled('button', {
  cursor: 'pointer',
  border: 'none',
  backgroundColor: 'transparent',
  margin: 0,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.space[7],
  height: theme.space[7],
  minWidth: theme.space[7],

  '& svg': {
    height: theme.space[5],
    width: theme.space[5],

    path: {
      fill: theme.colors.text4,
    },
  },

  '&:hover': {
    '& svg': {
      path: {
        fill: theme.colors.text1,
      },
    },
  },
});

export const StyledWarningButton = styled('button', {
  cursor: 'pointer',
  margin: 0,
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: theme.space[7],
  height: theme.space[7],
  minWidth: theme.space[7],
  // borderRadius: theme.space[1],
  // border: `1px solid ${theme.colors.orange_light}`,
  // backgroundColor: theme.colors.orange_lightest,

  '& svg': {
    height: theme.space[6],
    width: theme.space[6],

    path: {
      fill: theme.colors.orange_light,
    },
  },

  '&:hover': {
    // border: `1px solid ${theme.colors.orange_default}`,

    '& svg': {
      path: {
        fill: theme.colors.orange_default,
      },
    },
  },
});
