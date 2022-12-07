import { css, theme } from '../../theme';

export const StyledHTTPHeaderControlWrap = css({
  display: `flex`,
  flexDirection: `column`,
  gap: theme.space[4],
});

export const StyledHTTPHeaderControl = css({
  display: `grid`,
  alignItems: `center`,
  justifyContent: `center`,
  gridTemplateColumns: `64px 1fr 1fr 24px`,
  gap: theme.space[3],

  '&:first-of-type': {
    hairlineB: theme.colors.surface3,
    paddingBottom: theme.space[1],

    span: {
      color: theme.colors.text3,
      fontSize: 10,
      textTransform: `uppercase`,
      letterSpacing: 0.5,
    },
  },
});

export const StyledRemoveHeaderButtonWrap = css({
  svg: {
    transform: `rotate(-45deg)`,
  },
  variants: {
    isDisabled: {
      true: {
        '&:hover': {
          svg: {
            path: {
              fill: theme.colors.surface3,
            },
          },
        },
      },
    },
  },
});

export const StyledAddHeaderButtonWrap = css({
  hairlineT: theme.colors.surface3,
  paddingTop: theme.space[3],
});
