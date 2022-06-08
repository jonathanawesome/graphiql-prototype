import { styled } from '../../theme';

// import * as TabsPrimitive from '@radix-ui/react-tabs';
export const Wrap = styled('section', {
  height: '100%',
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

export const TabButtonRow = styled('div', {
  display: 'flex',
  gap: 12,
});

// export const Root = styled(TabsPrimitive.Root, {
//   height: '100%',
// });

// export const TriggerList = styled(TabsPrimitive.List, {
//   display: 'flex',
//   gap: 8,
// });

// export const Trigger = styled(TabsPrimitive.Trigger, {
//   cursor: 'pointer',
//   fontSize: '$body',
//   lineHeight: '$body',
//   fontWeight: '$medium',
//   padding: '10px',
//   color: '$scale700',

//   '&:hover': { color: '$scale800' },
//   '&[data-state="active"]': {
//     fontWeight: '$semiBold',
//     color: '$scale800',
//   },

//   span: {
//     padding: '2px 4px',
//     marginLeft: '4px',
//     borderRadius: '2px',
//     fontSize: '$mini',
//     backgroundColor: '$scale300',
//     color: '$scale700',
//   },
// });

// export const Content = styled(TabsPrimitive.Content, {
//   padding: '0 16px 16px 16px',
//   height: '100%',
// });
