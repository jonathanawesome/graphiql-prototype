import { css, theme } from '@graphiql-prototype/ui-library';

// import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

export const StyledCustomSchemaFormWrap = css({
  display: `flex`,
  flexDirection: `column`,
  gap: 24,
  marginTop: theme.space[3],
  marginBottom: theme.space[3],
});

export const StyledSchemaSelector = css({
  marginTop: theme.space[3],
});

export const StyledSubmitButton = css({
  backgroundColor: theme.colors.surface3,
  border: '1px solid transparent',
  color: theme.colors.text1,
  width: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 12,
  borderRadius: 4,
  fontSize: 12,
  fontWeight: theme.fontWeights.medium,
  placeSelf: 'flex-end',

  '&:hover': {
    backgroundColor: theme.colors.surface2,
    border: `1px solid ${theme.colors.surface3}`,
  },
});

export const StyledError = css({
  display: 'block',
  backgroundColor: theme.colors.red_lightest,
  color: theme.colors.red_default,
  border: `1px solid ${theme.colors.red_light}`,
  borderRadius: 2,
  fontStyle: 'italic',
  fontSize: theme.fontSizes.body,
  marginTop: theme.space[3],
  padding: theme.space[2],
});

export const StyledRadioGroupRadio = css({
  all: 'unset',
  boxSizing: 'border-box',
  border: `1px solid ${theme.colors.text4}`,
  width: 16,
  height: 16,
  borderRadius: '100%',
  cursor: 'pointer',

  '&:hover': {
    border: `1px solid ${theme.colors.text1}`,
    backgroundColor: theme.colors.surface3,
  },
});

export const StyledRadioGroupIndicator = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',

  '&::after': {
    content: '""',
    display: 'block',
    width: 6,
    height: 6,
    borderRadius: '50%',
    backgroundColor: theme.colors.pink_default,
  },
});

export const StyledRadioGroup = css({
  position: 'relative',
  paddingTop: theme.space[4],
  margin: '12px 0',

  fieldset: {
    all: 'unset',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    transform: 'scale(1)',
    transition: `all .15s ${theme.transitions.authenticMotion}`,

    '&:disabled': {
      transform: 'scale(0.99)',
      opacity: 0.15,
    },
  },
});

export const StyledRadioWrap = css({
  display: 'flex',
  alignItems: 'center',

  label: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    userSelect: 'none',
    paddingLeft: 15,

    span: {
      // color: theme.colors.text1,
      fontSize: theme.fontSizes.body,
      lineHeight: 1,
    },

    a: {
      // color: theme.colors.text1,
      fontSize: theme.fontSizes.body,
      lineHeight: 1,
    },
  },

  variants: {
    isActive: {
      true: {
        span: {
          color: theme.colors.text1,
          fontWeight: theme.fontWeights.medium,
        },

        a: {
          color: theme.colors.text1,
          fontWeight: theme.fontWeights.medium,
        },
      },
      false: {
        span: {
          color: theme.colors.text2,
          // fontWeight: 400,
        },

        a: {
          color: theme.colors.text2,
          // fontWeight: 400,
        },
      },
    },
  },
});

export const StyledSpinnerWrap = css({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transition: `all .1s ${theme.transitions.authenticMotion}`,

  variants: {
    loading: {
      false: {
        visibility: 'hidden',
        opacity: 0,
        transform: 'translate3d(-50%, -50%, 0) scale(0.5)',
      },
      true: {
        visibility: 'visible',
        opacity: 1,
        transform: 'translate3d(-50%, -50%, 0) scale(1)',
      },
    },
  },
});
