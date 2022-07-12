// styles
import { styled } from '@graphiql-prototype/graphiql-ui-library';

export const Separator = styled('span', {
  display: 'block',
  backgroundColor: '$gray015',
  margin: '24px 0',

  variants: {
    orientation: {
      vertical: {
        height: '100%',
        width: 1,
      },
      horizontal: {
        height: 1,
        width: '100%',
      },
    },
  },
});
