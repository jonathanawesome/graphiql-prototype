import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const TabWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  borderRadius: 8,

  variants: {
    isActive: {
      true: {
        backgroundColor: '$gray010',
        paddingRight: 10,
      },
    },
  },
});

export const TabButton = styled('button', {
  fontSize: '$body',
  fontWeight: '$medium',
  padding: '10px 10px 10px 12px',
  borderRadius: 8,
  color: '$gray060',

  '&:disabled': {
    // cursor: 'not-allowed',
  },

  '&:hover': {
    color: '$gray100',
  },

  variants: {
    isActive: {
      true: {
        color: '$gray100',
        fontWeight: '$semiBold',
        paddingRight: 6,
      },
    },
  },
});

export const RemoveTabButton = styled('button', {
  userSelect: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  width: 16,
  height: 16,

  svg: {
    width: 18,
    height: 18,
    path: {
      fill: '$gray040',
    },
  },

  '&:hover': {
    backgroundColor: '$gray040',
    svg: {
      width: 12,
      height: 12,
      path: {
        fill: '$editorBackground',
      },
    },
  },
});
