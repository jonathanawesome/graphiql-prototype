import { styled, theme } from '../../theme';

export const StyledMarkdown = styled('div', {
  display: `flex`,
  flexDirection: `column`,
  paddingTop: theme.space[1],
  paddingBottom: theme.space[1],
  color: theme.colors.text2,

  'p, blockquote, ul, ol, dl, table, pre, details': {
    fontWeight: theme.fontWeights.regular,
    fontSize: 13,
    lineHeight: 1.5,

    color: theme.colors.text2,
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
});
