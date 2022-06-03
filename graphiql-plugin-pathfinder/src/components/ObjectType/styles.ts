import { styled } from '@stitches/react';

import { theme } from '@graphiql-v2-prototype/graphiql-v2';

export const ObjectTypeWrap = styled('div', {
  variants: {
    parentType: {
      FIELD: {
        // backgroundColor: 'Aquamarine',
        // paddingLeft: 12,
      },
      INLINE_FRAGMENT: {
        borderLeft: `1px solid ${theme.colors.scale300.value}`,
        // backgroundColor: 'Yellow',
        marginLeft: 0,
        paddingLeft: 12,
      },
    },
  },
});
