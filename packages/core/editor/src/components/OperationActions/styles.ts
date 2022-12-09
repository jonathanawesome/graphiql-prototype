import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledOperationActions = css({
  display: 'flex',
  gap: theme.space[4],
});

export const StyledPlayButtonType = css({
  fontSize: 12,
  fontWeight: theme.fontWeights.medium,
  color: theme.colors.text3,
});

export const StyledPlayButton = css({
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
  borderRadius: theme.space[1],
  paddingRight: theme.space[2],
  paddingLeft: theme.space[2],

  '& svg': {
    height: theme.space[2],
    width: theme.space[2],
    path: {
      fill: theme.colors.text3,
    },
  },

  variants: {
    isDisabled: {
      true: {
        cursor: `not-allowed`,
        opacity: 0.5,
      },
      false: {
        border: `1px solid ${theme.colors.text4}`,

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
      },
    },
  },
});

export const StyledPrettierButton = css({
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

export const StyledWarningButton = css({
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
