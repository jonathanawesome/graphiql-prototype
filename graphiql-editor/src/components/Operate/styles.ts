import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

export const OperateWrap = styled('div', {
  position: 'relative',
  width: '100%',
  // height: '100%',
  backgroundColor: '$scale100',
  overflow: 'hidden',
  borderRadius: 16,
  boxShadow:
    '0px 6px 20px rgba(59, 76, 106, 0.13), 0px 1.34018px 4.46726px rgba(59, 76, 106, 0.0774939), 0px 0.399006px 1.33002px rgba(59, 76, 106, 0.0525061)',

  variants: {
    expanded: {
      true: {
        height: 'calc(100% + 50px)',
        marginTop: -50,
      },
      false: {
        height: '100%',
        marginTop: 0,
      },
    },
  },
});

export const OperationEditor = styled('div', {
  position: 'relative',
  height: '100%',
  width: '100%',
  paddingTop: 20,
  paddingRight: 48,
  paddingBottom: 20,
  paddingLeft: 12,
});

export const OperationActionsWrap = styled('div', {
  position: 'absolute',
  top: 16,
  right: 16,
});

export const OperationToolsWrap = styled('div', {
  position: 'absolute',
  bottom: 0,
  width: '100%',
});
