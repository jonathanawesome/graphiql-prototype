import { styled } from '../../../theme';
import * as SelectPrimitive from '@radix-ui/react-select';

export const SelectTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: 'unset',
  boxSizing: 'border-box',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: 12,
  lineHeight: 1,
  cursor: 'pointer',
  color: '$accentSuccess',
  paddingRight: 8,
  minHeight: 32,
  fontSize: 12,
  fontFamily: '$mono',

  svg: {
    height: 9,
    width: 9,

    path: {
      fill: '$scale600',
    },
  },

  '&:hover': {
    backgroundColor: '$scale200',
  },
});

export const SelectContent = styled(SelectPrimitive.Content, {
  overflow: 'hidden',
  backgroundColor: '$scale100',
  fontSize: 12,
  fontFamily: '$mono',
  borderRadius: 6,
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
});

export const SelectViewport = styled(SelectPrimitive.Viewport, {
  padding: 5,
});

export const SelectItem = styled(SelectPrimitive.Item, {
  all: 'unset',
  boxSizing: 'border-box',
  lineHeight: 1,
  color: '$accentSuccess',
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&:focus': {
    backgroundColor: '$scale200',
  },
});

export const SelectItemText = styled(SelectPrimitive.ItemText, {
  // color: 'red',
});

export const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const Description = styled('span', {
  color: '$scale700',
  fontSize: 10,
});

export const SelectIcon = styled(SelectPrimitive.Icon, {
  svg: {
    transform: 'scale(.9) rotate(180deg)',
  },
});

export const SelectItemIndicator = styled(StyledItemIndicator, {
  svg: {
    width: 12,
    height: 12,

    path: {
      fill: '$scale700',
    },
  },
});

export const StyledSelect = styled(SelectPrimitive.Root, {});

export const SelectValue = styled(SelectPrimitive.Value, {});
