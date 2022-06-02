import { styled } from '@stitches/react';

export const ObjectTypeWrap = styled('div', {
  variants: {
    parentType: {
      FIELD: {
        // backgroundColor: 'Aquamarine',
        // paddingLeft: 12,
      },
      INLINE_FRAGMENT: {
        borderLeft: `1px solid $scale300`,
        // backgroundColor: 'Yellow',
        marginLeft: 0,
        paddingLeft: 12,
      },
    },
  },
});
