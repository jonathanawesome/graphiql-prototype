import { css, theme } from '../../theme';
import type * as Stitches from '@stitches/core';

export type ButtonVariants = Stitches.VariantProps<typeof StyledButton>;

export const StyledButton = css({
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.space[1],
  width: 'fit-content',
  color: theme.colors.text2,

  variants: {
    type: {
      PRIMARY: {
        opacity: 0.85,
        color: theme.colors.green_default,

        '&:hover': {
          opacity: 1,
        },
      },
    },
    isDisabled: {
      true: {
        opacity: 0.5,
        cursor: `not-allowed`,
      },
      false: {
        '&:hover': {
          svg: {
            path: {
              fill: theme.colors.text1,
            },
          },
        },
      },
    },
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
    style: {
      STANDARD: {
        backgroundColor: theme.colors.surface1,

        '&:hover': {
          backgroundColor: theme.colors.surface2,
          svg: {
            path: {
              fill: theme.colors.text1,
            },
          },
        },
      },
      GHOST: {
        display: `inline-flex`,
      },
      ICON: {
        backgroundColor: `transparent`,
        '&:hover': {
          backgroundColor: theme.colors.surface2,
          svg: {
            path: {
              fill: theme.colors.text2,
            },
          },
        },
        '&:focus': {
          outline: `1px dotted ${theme.colors.surface3}`,
        },
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
      style: 'ICON',
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
      style: 'ICON',
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
      style: 'ICON',
      size: 'SMALL',
      css: {
        width: theme.space[7],
        height: theme.space[7],
        borderRadius: 2,

        svg: {
          height: theme.space[3],
          width: theme.space[3],
        },
      },
    },
    {
      style: 'GHOST',
      size: 'SMALL',
      css: {
        fontSize: 10,
      },
    },
    {
      style: 'GHOST',
      size: 'MEDIUM',
      css: {
        fontSize: 12,
      },
    },
    {
      style: 'GHOST',
      size: 'LARGE',
      css: {
        fontSize: 14,
      },
    },
  ],
});
