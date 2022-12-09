import { css, theme } from '../../theme';

export const StyledMarkdown = css({
  display: `flex`,
  flexDirection: `column`,
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],
  color: theme.colors.text1,

  'p, blockquote, ul, ol, dl, table, pre, details': {
    fontWeight: theme.fontWeights.regular,
    fontSize: 13,
    lineHeight: 1.5,

    color: theme.colors.text1,
    marginTop: 0,
    marginBottom: theme.space[4],
  },

  blockquote: {
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: theme.space[2],
    borderLeft: `2px solid ${theme.colors.surface3}`,
  },

  'code, pre': {
    borderRadius: theme.space[1],
    backgroundColor: theme.colors.surface2,
  },

  code: {
    padding: theme.space[1],
  },

  pre: {
    overflow: `auto`,
    padding: theme.space[2],
  },

  'ol, ul': {
    paddingLeft: theme.space[4],
  },

  ol: {
    listStyleType: `decimal`,
  },

  ul: {
    listStyleType: `disc`,
  },

  a: {
    color: theme.colors.blue_default,
  },

  hr: {
    all: `unset`,
    borderTop: `1px solid ${theme.colors.text4}`,
  },

  img: {
    maxHeight: 120,
    maxWidth: `100`,
  },

  ':first-child': {
    marginTop: 0,
  },

  ':last-child': {
    marginBottom: 0,
  },

  variants: {
    showSummary: {
      true: {
        '& > :not(:first-child)': {
          display: `none`,
        },
        opacity: 0.7,
      },
    },
  },
});
