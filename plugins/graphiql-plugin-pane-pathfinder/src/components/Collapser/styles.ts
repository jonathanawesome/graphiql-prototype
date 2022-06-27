import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';
import * as Collapsible from '@radix-ui/react-collapsible';

export const Root = styled(Collapsible.Root, {
  position: 'relative',
});

export const ItemGrid = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '15px 1fr',
  alignItems: 'start',
  gap: 12,

  variants: {
    hasToggler: {
      true: {
        gridTemplateColumns: '15px 15px 1fr',
        gap: 6,
      },
    },
  },
});

export const Trigger = styled(Collapsible.Trigger, {
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
    isExpanded: {
      true: {
        svg: {
          transform: 'rotate(90deg)',
          fill: '$secondary060',
        },
      },
      false: {
        svg: {
          fill: '$gray040',
        },
      },
    },
  },
});

export const Content = styled(Collapsible.Content, {});