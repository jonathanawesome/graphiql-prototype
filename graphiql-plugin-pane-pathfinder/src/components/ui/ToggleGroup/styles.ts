import { styled } from '@graphiql-v2-prototype/graphiql-v2';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

export const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  backgroundColor: '$scale300',
  borderRadius: 8,
  boxShadow: '0 2px 10px $scaleBlack',
});

export const StyledItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  boxSizing: 'border-box',
  margin: 4,
  color: '$scale700',
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 1,
  cursor: 'pointer',
  userSelect: 'none',

  span: {
    padding: '10px 12px',
    fontSize: '$body',
    lineHeight: 1,
  },

  '&:first-child': {
    marginLeft: 4,
  },

  '&:hover': { backgroundColor: '$scale200' },

  '&[data-state=on]': {
    backgroundColor: '$scale100',
    color: '$scale800',
    fontWeight: '$medium',
    boxShadow:
      '0px 0.4px 1.9px rgba(59, 76, 106, 0.03), 0px 1.12px 5px rgba(59, 76, 106, 0.04), 0px 2.7px 12.6px rgba(59, 76, 106, 0.05), 0px 2.7px 12.6px rgba(59, 76, 106, 0.08)',
    pointerEvents: 'none',
  },
});
