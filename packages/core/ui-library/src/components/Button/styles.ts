import { styled, theme } from '../../theme';
import type * as Stitches from '@stitches/react';

export type ButtonVariants = Stitches.VariantProps<typeof StyledButton>;

export const StyledButton = styled('button', {
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space[1],
  width: 'fit-content',
  backgroundColor: theme.colors.surface1,

  '&:hover': {
    backgroundColor: theme.colors.surface2,
    svg: {
      path: {
        fill: theme.colors.text1,
      },
    },
  },

  variants: {
    size: {
      LARGE: {
        height: theme.space[7],
      },
      SMALL: {
        height: theme.space[5],
      },
    },
    variant: {
      STANDARD: {
        backgroundColor: theme.colors.surface1,
        padding: `0px ${theme.space[3]}`,
      },
      ICON: {
        backgroundColor: theme.colors.surface1,
        svg: {
          path: {
            fill: theme.colors.text4,
          },
        },
      },
    },
  },

  compoundVariants: [
    {
      variant: 'ICON',
      size: 'LARGE',
      css: {
        width: theme.space[7],
        svg: {
          height: theme.space[5],
          width: theme.space[5],
        },
      },
    },
    {
      variant: 'ICON',
      size: 'SMALL',
      css: {
        width: theme.space[5],
        svg: {
          height: theme.space[3],
          width: theme.space[3],
        },
      },
    },
  ],
});
