import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const Note = styled('span', {
  display: 'block',
  fontSize: '$mini',
  color: '$accentArgument',
  marginBottom: 12,
  marginTop: 4,
  fontStyle: 'italic',
});

export const RadioGroupRadio = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  boxSizing: 'border-box',
  border: '1px solid $scale500',
  width: 16,
  height: 16,
  borderRadius: '100%',
  cursor: 'pointer',

  '&:hover': {
    border: '1px solid $scale700',
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
    backgroundColor: '$accentArgument',
  },
});

export const RadioGroup = styled(RadioGroupPrimitive.Root, {
  fieldset: {
    all: 'unset',
    boxSizing: 'border-box',

    '&:disabled': {
      opacity: 0.5,
    },
  },
});

export const RadioWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0',

  label: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    userSelect: 'none',
    paddingLeft: 15,

    span: {
      color: '$scale800',
      fontSize: 12,
      lineHeight: 1,
    },

    a: {
      color: '$scale800',
      fontSize: 12,
      lineHeight: 1,
    },
  },
});
