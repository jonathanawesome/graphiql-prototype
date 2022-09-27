import { styled, theme } from '../../theme';

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group';

export const StyledToggleGroup = styled(ToggleGroupPrimitive.Root, {
  display: 'inline-flex',
  backgroundColor: '$gray007',
  borderRadius: 8,
  boxShadow: `0 2px 10px ${theme.colors.surface1}`,

  variants: {
    size: {
      regular: {
        borderRadius: 8,
      },
      mini: {
        borderRadius: 5,
      },
    },
  },
});

export const StyledToggleItem = styled(ToggleGroupPrimitive.Item, {
  all: 'unset',
  boxSizing: 'border-box',
  color: '$gray060',
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

  '&:hover': { backgroundColor: '$gray010' },

  '&[data-state=on]': {
    backgroundColor: '$white',
    color: '$gray100',
    fontWeight: '$medium',
    boxShadow:
      '0px 0.4px 1.9px rgba(59, 76, 106, 0.03), 0px 1.12px 5px rgba(59, 76, 106, 0.04), 0px 2.7px 12.6px rgba(59, 76, 106, 0.05), 0px 2.7px 12.6px rgba(59, 76, 106, 0.08)',
    pointerEvents: 'none',
    svg: {
      path: {
        fill: '$gray100',
      },
    },
  },

  variants: {
    size: {
      regular: {
        margin: 4,
        borderRadius: 6,
        span: {
          padding: '10px 12px',
          fontSize: '$body',
        },
        svg: {
          height: 20,
          width: 20,
        },
      },
      mini: {
        margin: 4,
        borderRadius: 4,
        span: {
          padding: '8px 10px',
          fontSize: '$mini',
        },
        svg: {
          padding: 3,
          height: 24,
          width: 24,
          path: {
            fill: '$gray060',
          },
        },
      },
    },
  },
});
