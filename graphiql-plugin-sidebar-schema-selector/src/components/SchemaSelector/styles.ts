import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { styled } from '@graphiql-v2-prototype/graphiql-v2';

export const StyledRadio = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  border: '1px solid $scale700',
  width: 16,
  height: 16,
  borderRadius: '100%',
  cursor: 'pointer',
});

export const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
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

export const RadioGroup = RadioGroupPrimitive.Root;
export const RadioGroupRadio = StyledRadio;
export const RadioGroupIndicator = StyledIndicator;

export const Flex = styled('div', {
  display: 'flex',
  alignItems: 'center',
  margin: '10px 0',
});

export const Label = styled('label', {
  display: 'flex',
  alignItems: 'center',
  userSelect: 'none',
  paddingLeft: 15,

  a: {
    color: '$scale800',
    fontSize: 12,
    lineHeight: 1,
  },
});
