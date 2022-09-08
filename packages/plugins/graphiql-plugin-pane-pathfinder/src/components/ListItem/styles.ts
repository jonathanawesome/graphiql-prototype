import { styled, theme } from '@graphiql-prototype/ui-library';
import * as Collapsible from '@radix-ui/react-collapsible';

export const ListItemStyled = styled('li', {
  all: 'unset',
});

export const Layout = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'start',
  gap: theme.space[3],

  variants: {
    hasToggler: {
      true: {
        gridTemplateColumns: '15px 1fr',
        gap: 6,
      },
    },
    isCollapsible: {
      true: {
        gridTemplateColumns: '15px 1fr',
        gap: 6,
      },
    },
  },

  compoundVariants: [
    {
      hasToggler: true,
      isCollapsible: true,
      css: {
        gridTemplateColumns: '15px 15px 1fr',
        gap: 6,
      },
    },
  ],
});

export const CollapsibleRoot = styled(Collapsible.Root, {
  position: 'relative',
});

export const CollapsibleTrigger = styled(Collapsible.Trigger, {
  height: 15,
  width: 15,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    height: 7,
    width: 7,
  },

  variants: {
    isCollapsed: {
      true: {
        svg: {
          fill: theme.colors.text4,
        },
      },
      false: {
        svg: {
          transform: 'rotate(90deg)',
          fill: theme.colors.text4,
        },
      },
    },
  },
});

export const CollapsibleContent = styled(Collapsible.Content, {
  marginTop: theme.space[3],
});

export const Arguments = styled('ul', {
  paddingLeft: 14,
  marginLeft: 7,
  marginBottom: theme.space[2],
});

export const ChildFields = styled('ul', {
  paddingLeft: theme.space[3],
  marginLeft: 7,
  variants: {
    variant: {
      FIELD: {
        marginLeft: 27,
        borderLeft: `1px solid ${theme.colors.surface3}`,
      },
      INLINE_FRAGMENT: {
        paddingLeft: 18,
        marginLeft: 0,
      },
      ARGUMENT: {
        borderLeft: `1px solid ${theme.colors.surface3}`,
      },
      INPUT_OBJECT: {},
      ROOT: {
        borderLeft: `1px solid ${theme.colors.surface3}`,
        marginBottom: theme.space[3],
      },
    },
  },
});
