import { styled } from '@stitches/react';

export const EditorStackContainer = styled('div', {
  position: 'relative',
  width: '100%',
  backgroundColor: `$scale100`,
  overflow: 'hidden',
  borderRadius: 16,
  boxShadow:
    '0px 6px 20px rgba(59, 76, 106, 0.13), 0px 1.34018px 4.46726px rgba(59, 76, 106, 0.0774939), 0px 0.399006px 1.33002px rgba(59, 76, 106, 0.0525061)',
});

export const Top = styled('div', {
  // backgroundColor: 'orange',
});

export const OperationsEditor = styled('div', {
  position: 'relative',
  height: '100%',
  paddingTop: 20,
  paddingLeft: 12,
  paddingRight: 48,
});

export const EditorActionsWrap = styled('div', {
  position: 'absolute',
  top: 16,
  right: 16,
});

export const Bottom = styled('div', {
  position: 'absolute',
  bottom: 0,
  width: '100%',
});

export const FakeTabs = styled('div', {
  backgroundColor: `$scale100`,
  borderTop: `1px solid $scale400`,
});

export const TabsAndTrigger = styled('div', {
  display: 'flex',
  padding: `0 12px`,

  span: {
    fontSize: 12,
    lineHeight: 1,
    fontWeight: 500,
    padding: 12,
    display: 'flex',
    alignContent: 'center',
    justifyItems: 'center',
    '&:nth-of-type(2)': {
      color: `$scale700`,
    },
  },

  button: {
    border: 'none',
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
    cursor: 'pointer',
    marginLeft: 'auto',

    svg: {
      height: 15,
      width: 15,
    },
  },
});

export const VariablesEditor = styled('div', {
  height: 200,
  paddingLeft: 12,
  paddingRight: 12,
});
