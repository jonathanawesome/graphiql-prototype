import { styled } from '@graphiql-v2-prototype/graphiql-v2';
import { SharedLeadGrid } from '../ui';

export const NotCollapsible = styled('div', {
  ...SharedLeadGrid,
});

export const ChildFields = styled('div', {
  borderLeft: '1px solid $scale400',
  marginLeft: 7,
  paddingLeft: 12,
});

export const IndicatorWrap = styled('button', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  svg: {
    height: 15,
    width: 15,
  },

  variants: {
    isActive: {
      false: {
        svg: {
          transform: 'scale(0.85)',
        },
      },
    },
  },
});
