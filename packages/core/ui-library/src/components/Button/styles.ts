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
  color: theme.colors.text2,

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
      MEDIUM: {
        height: theme.space[5],
      },
      SMALL: {
        height: theme.space[4],
      },
    },
    variant: {
      ICON: {
        backgroundColor: `transparent`,
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
        width: theme.space[12],
        height: theme.space[12],
        svg: {
          height: theme.space[6],
          width: theme.space[6],
        },
      },
    },
    {
      variant: 'ICON',
      size: 'MEDIUM',
      css: {
        width: theme.space[10],
        height: theme.space[10],
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
        width: theme.space[6],
        height: theme.space[6],
        svg: {
          height: theme.space[3],
          width: theme.space[3],
        },
      },
    },
  ],
});
