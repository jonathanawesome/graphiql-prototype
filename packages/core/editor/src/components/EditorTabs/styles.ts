import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledEditorTabs = css({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  // hairlineB: theme.colors.surface3,
  borderBottom: `1px solid ${theme.colors.surface3}`,
  minWidth: 0,
});

export const StyledRemoveTabButtonWrap = css({
  position: 'absolute',
  top: theme.space[2],
  right: theme.space[1],
  // backgroundColor: theme.colors.surface1,

  button: {
    width: theme.space[6],
    height: theme.space[6],
  },

  '&:hover': {
    button: {
      backgroundColor: theme.colors.surface3,
    },
  },
});

export const StyledTabButton = css({
  all: 'reset',
  cursor: 'pointer',
  fontSize: theme.fontSizes.body,
  lineHeight: theme.fontSizes.body,
  paddingLeft: theme.space[3],
  paddingRight: theme.space[3],
  height: theme.space[10],
  color: theme.colors.text3,
  display: `flex`,
  alignItems: `center`,
  gap: theme.space[2],

  variants: {
    hasRemoveTabButton: {
      true: {
        paddingRight: theme.space[9],
      },
    },
  },
});

export const StyledTabWrap = css({
  height: `100%`,
  position: `relative`,
  display: `flex`,
  alignItems: `center`,
  flexWrap: `nowrap`,
  minWidth: 0,
  backgroundColor: theme.colors.surface1,
  // hairlineB: theme.colors.surface3,
  borderRight: `1px solid transparent`,
  borderLeft: `1px solid transparent`,

  '&:hover': {
    backgroundColor: theme.colors.surface2,
  },

  variants: {
    isActive: {
      false: {
        '&:hover': {
          height: `calc(100% - 1px)`,

          [`& ${StyledRemoveTabButtonWrap}`]: {
            marginTop: `calc(-1 * var(--hairline-width))`,
          },
        },
      },
      true: {
        flexShrink: 0,
        backgroundColor: theme.colors.surface2,
        // borderTop: `1px solid ${theme.colors.surface3}`,
        borderRight: `1px solid ${theme.colors.surface3}`,
        borderLeft: `1px solid ${theme.colors.surface3}`,

        '&:nth-of-type(1)': {
          borderLeft: `1px solid transparent`,
        },

        [`& ${StyledTabButton}`]: {
          color: theme.colors.text2,
        },

        '&:after': {
          content: '',
          position: 'absolute',
          bottom: -1,
          left: 0,
          height: 2,
          width: '100%',
          // backgroundColor: theme.colors.green_default,
          backgroundColor: theme.colors.surface2,
        },
      },
    },
  },
});

export const StyledAddTabButtonWrap = css({
  marginLeft: theme.space[2],
  marginRight: theme.space[2],
});
