import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const GraphiQLLink = styled('div', {
  a: {
    color: '$scale600',
    fontSize: '$body',
    fontWeight: '$semiBold',
  },
});

export const TabRow = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  // backgroundColor: 'orange',
});

export const EditorHeader = styled('div', {
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 12,
  margin: '4px 0 12px',
  paddingRight: '16px',
  // backgroundColor: 'red',
  height: 40,
});

export const TabControlsWrap = styled('div', {
  display: 'flex',
  alignItems: 'center',
  borderRadius: 8,

  variants: {
    isActive: {
      true: {
        backgroundColor: '$scale400',
        // color: '$scale800',
        // fontWeight: '$semiBold',
        paddingRight: 12,
      },
    },
  },
});

export const TabButton = styled('button', {
  fontSize: '$body',
  fontWeight: '$medium',
  padding: '10px 10px 10px 12px',
  borderRadius: 8,
  color: '$scale700',

  '&:disabled': {
    // cursor: 'not-allowed',
  },

  '&:hover': {
    color: '$scale800',
  },

  variants: {
    isActive: {
      true: {
        color: '$scale800',
        fontWeight: '$semiBold',
      },
    },
  },
});

export const AddTabButton = styled('button', {
  userSelect: 'none',

  svg: {
    width: 11,
    height: 11,
    path: {
      transition: 'fill .15s ease',
    },
  },

  '&:hover': {
    svg: {
      path: {
        fill: '$scale700',
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
  width: 18,
  height: 18,
  transition: 'all .15s ease',
  svg: {
    width: 14,
    height: 14,
    path: {
      fill: '$scale700',
      transition: 'fill .15s ease',
    },
  },

  '&:hover': {
    backgroundColor: '$scale600',
    svg: {
      path: {
        fill: '$scale200',
      },
    },
  },
});
