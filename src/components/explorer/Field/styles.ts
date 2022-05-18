import { styled } from '@stitches/react';
import { theme } from '@/theme';

export const SelectedArgs = styled('div', {
  // backgroundColor: 'green',
});

export const RequiredArgs = styled('div', {
  // backgroundColor: 'Red',
});

export const OptionalArgs = styled('div', {
  marginBottom: 12,
});

export const ChildFields = styled('div', {
  borderLeft: `1px solid $scale100`,
  marginLeft: 8,
});

export const ArgsContainer = styled('div', {
  marginLeft: 20,
});

export const FieldCollapsibleTriggerWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: 6,
});

export const FieldWrap = styled('div', {
  position: 'relative',

  variants: {
    offset: {
      true: {
        paddingLeft: 12,
      },
    },
  },
});

export const FieldTogglerButton = styled('button', {
  border: 'none',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  height: 15,
  width: 15,

  '& svg': {
    height: 13,
    width: 13,
  },

  '&:hover': {
    '& svg': {
      '& path:nth-of-type(2)': {
        fill: theme.colors.scale600,
      },
    },
  },

  variants: {
    active: {
      true: {
        '& svg': {
          height: 15,
          width: 15,
        },
      },
    },
  },
});
