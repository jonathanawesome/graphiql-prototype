import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const GraphiQLLink = styled('div', {
  a: {
    color: '$scale600',
    fontSize: '$body',
    fontWeight: '$semiBold',
  },
});

export const EditorTabControls = styled('div', {
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between',
  gap: 12,
  padding: '0 16px',
});

export const TabButton = styled('button', {
  fontSize: '$mini',
  '&:disabled': {
    // backgroundColor: 'red',
    cursor: 'not-allowed',
  },

  variants: {
    isActive: {
      true: {
        backgroundColor: 'Lime',
      },
    },
  },
});

export const AddTabButton = styled('div', {
  // width: '100%',
  display: 'flex',
  gap: 12,

  svg: {
    width: 15,
    height: 15,
    transform: 'rotate(45deg)',
  },
});

export const TabButtonRow = styled('div', {
  width: '100%',
  display: 'flex',
  gap: 12,
});

export const EditorInner = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  padding: 8,
  backgroundColor: '$scale300',
  borderRadius: 20,
});

export const EditorWrap = styled('div', {
  height: '100%',
  width: '100%',
  padding: 16,
  overflow: 'hidden',
});
