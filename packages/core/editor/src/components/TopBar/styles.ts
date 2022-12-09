import { css, theme } from '@graphiql-prototype/ui-library';

export const StyledTopBar = css({
  position: `relative`,
  width: '100%',
  height: '100%',
  paddingRight: 48,
  display: 'flex',
  justifyContent: 'space-between',
  // borderBottom: `1px solid ${theme.colors.surface3}`,
  hairlineB: theme.colors.surface3,

  '& .hideWhenSearchVisible': {
    display: `inline-flex`,
    width: `100%`,
  },

  variants: {
    searchBarVisible: {
      true: {
        '& .hideWhenSearchVisible': {
          display: `none`,
        },
      },
    },
  },
});
