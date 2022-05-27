import { styled } from '@stitches/react';
import * as Collapsible from '@radix-ui/react-collapsible';

export const NestedObjectType = styled('div', {
  // borderLeft: `1px solid red`,
  marginLeft: -14,
  marginTop: 8,
});

export const Content = styled(Collapsible.Content, {
  marginLeft: 20,
});

export const TriggerWrap = styled('div', {
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '15px 1fr',
  alignItems: 'flex-start',
  gap: 6,

  variants: {
    isCollapsible: {
      true: {
        gridTemplateColumns: '15px 15px 1fr',
      },
    },
  },
});

export const Trigger = styled(Collapsible.Trigger, {});

export const Root = styled(Collapsible.Root, {
  position: 'relative',
  padding: `8px 0 0`,
});

export const UnionTypeWrap = styled('div', {
  // borderLeft: `1px solid red`,

  [`& ${Root}`]: {
    [`&:nth-of-type(1)`]: {
      paddingTop: 0,
    },
  },
});
