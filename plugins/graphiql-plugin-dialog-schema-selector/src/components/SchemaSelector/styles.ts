import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const CustomSchemaFormWrap = styled('div', {
  margin: '12px 0',
});

export const Note = styled('span', {
  display: 'block',
  fontSize: '$mini',
  color: '$info100',
  backgroundColor: '$info010',
  border: '1px solid $info060',
  borderRadius: 2,
  marginBottom: 12,
  padding: 6,
});

export const Error = styled('span', {
  display: 'block',
  fontSize: '$body',
  color: '$error100',
  backgroundColor: '$gray010',
  marginTop: 12,
  padding: 8,
  fontStyle: 'italic',
});

export const RadioGroupRadio = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  boxSizing: 'border-box',
  border: '1px solid $gray040',
  width: 16,
  height: 16,
  borderRadius: '100%',
  cursor: 'pointer',

  '&:hover': {
    border: '1px solid $gray100',
  },
});

export const RadioGroupIndicator = styled(RadioGroupPrimitive.Indicator, {
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
    backgroundColor: '$primary100',
  },
});

export const RadioGroup = styled(RadioGroupPrimitive.Root, {
  position: 'relative',
  margin: '12px 0',

  fieldset: {
    all: 'unset',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    transform: 'scale(1)',
    transition: 'all .15s $authenticMotion',

    '&:disabled': {
      transform: 'scale(0.99)',
      opacity: 0.15,
    },
  },
});

export const RadioWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',

  label: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    userSelect: 'none',
    paddingLeft: 15,

    span: {
      // color: '$gray100',
      fontSize: '$body',
      lineHeight: 1,
    },

    a: {
      // color: '$gray100',
      fontSize: '$body',
      lineHeight: 1,
    },
  },

  variants: {
    isActive: {
      true: {
        span: {
          color: '$gray100',
          fontWeight: 500,
        },

        a: {
          color: '$gray100',
          fontWeight: 500,
        },
      },
      false: {
        span: {
          color: '$gray060',
          fontWeight: 400,
        },

        a: {
          color: '$gray060',
          fontWeight: 400,
        },
      },
    },
  },
});

export const SpinnerWrap = styled('div', {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transition: 'all .1s $authenticMotion',

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
