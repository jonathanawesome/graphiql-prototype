import { styled, theme } from '@graphiql-prototype/ui-library';
import * as Collapsible from '@radix-ui/react-collapsible';

export const StyledDescription = styled(Collapsible.Root, {
  position: 'relative',
  marginBottom: 8,

  variants: {
    isOpen: {
      true: {
        marginBottom: theme.space[4],
      },
      false: {},
    },
  },
});

export const StyledDescriptionTrigger = styled(Collapsible.Trigger, {
  height: theme.space[5],
  paddingLeft: theme.space[1],
  paddingRight: theme.space[1],
  width: `100%`,
  display: 'flex',
  alignItems: 'center',
  gap: 12,

  span: {
    fontSize: 10,
    textTransform: `uppercase`,
    letterSpacing: 0.5,
    // color: theme.colors.blue_default,
    color: theme.colors.text2,
  },

  svg: {
    height: 7,
    width: 7,
  },

  variants: {
    isOpen: {
      true: {
        svg: {
          transform: 'rotate(90deg)',
          fill: theme.colors.blue_default,
        },
      },
      false: {
        svg: {
          fill: theme.colors.text4,
        },

        '&:hover': {
          // span: {
          //   color: theme.colors.text2,
          // },
          svg: {
            fill: theme.colors.text3,
          },
        },
      },
    },
  },
});

export const StyledDescriptionContent = styled(Collapsible.Content, {
  backgroundColor: theme.colors.blue_lightest,
  borderRadius: 2,
  // borderLeft: `1px solid ${theme.colors.blue_default}`,
  hairlineL: theme.colors.blue_default,
  marginLeft: 7,
  padding: 12,
  marginTop: 12,
});
