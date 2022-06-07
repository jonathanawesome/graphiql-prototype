import { styled } from '../../theme';
import * as Collapsible from '@radix-ui/react-collapsible';

export const Root = styled(Collapsible.Root, {
  position: 'relative',
});

export const ItemGrid = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '15px 1fr',
  alignItems: 'start',
  gap: 6,

  variants: {
    hasToggler: {
      true: {
        gridTemplateColumns: '15px 15px 1fr',
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
});

export const Content = styled(Collapsible.Content, {});
