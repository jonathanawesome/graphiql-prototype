import { css, theme } from '../../../theme';

export const StyledTab = css({
  all: `unset`,
  position: `relative`,
});

export const StyledTabTrigger = css({
  all: 'reset',
  cursor: 'pointer',
  fontSize: theme.fontSizes.body,
  lineHeight: theme.fontSizes.body,
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
  height: theme.space[10],
  color: theme.colors.text2,

  '&:hover': {
    backgroundColor: theme.colors.surface2,
    height: `calc(100% - 1px)`,
    paddingTop: 1,
  },

  '&[aria-selected="true"]': {
    color: theme.colors.text1,

    '&:after': {
      content: '',
      position: 'absolute',
      bottom: -1,
      left: 0,
      height: 2,
      width: '100%',
      backgroundColor: theme.colors.green_default,
    },
  },

  variants: {
    hasRemoveTabButton: {
      true: {
        paddingRight: theme.space[9],
      },
    },
  },
});
