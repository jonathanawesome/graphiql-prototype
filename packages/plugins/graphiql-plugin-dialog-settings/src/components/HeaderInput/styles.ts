import { styled } from '@graphiql-prototype/ui-library';

// other styles
import { StyledFieldInput } from '@graphiql-prototype/ui-library';

export const HeaderInputStyled = styled('div', {
  display: 'grid',
  gridTemplateColumns: '32px 160px 1fr',
  border: '1px solid $gray015',
  borderRadius: 8,
  minHeight: 34,
  fontFamily: '$mono',

  [`& ${StyledFieldInput}`]: {
    '&:nth-of-type(1)': {
      input: {
        borderRadius: '8px 0 0 8px !important',
        textAlign: 'left',
        paddingLeft: 12,
        borderRight: '1px solid $gray015',
        color: '$secondary100',
      },
    },
    '&:nth-of-type(2)': {
      width: '100%',
    },
  },
});

export const RemoveHeaderButton = styled('button', {
  borderRight: '1px solid $gray015',
  borderRadius: '8px 0 0 8px',
  height: 32,
  width: 32,

  svg: {
    padding: 8,
    path: {
      fill: '$gray060',
    },
  },

  '&:hover': {
    backgroundColor: '$error010',

    svg: {
      path: {
        fill: '$error100',
      },
    },
  },
});
