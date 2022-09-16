import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledVariablesWrap = styled('div', {
  padding: theme.space[4],
});

// import * as Collapsible from '@radix-ui/react-collapsible';
// import * as Tabs from '@radix-ui/react-tabs';

// export const CollapsibleRoot = styled(Collapsible.Root, {
//   backgroundColor: theme.colors.surface2,
//   borderTop: `1px solid ${theme.colors.surface3}`,
// });

// export const TabsAndTrigger = styled('div', {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'space-between',
// });

// export const TabsList = styled(Tabs.List, {
//   display: 'flex',
//   gap: theme.space[2],
// });

// export const TabsTrigger = styled(Tabs.Trigger, {
//   cursor: 'pointer',
//   fontSize: '$body',
//   lineHeight: '$body',
//   fontWeight: '$medium',
//   // padding: '10px',
//   color: theme.colors.text4,

//   '&:hover': {
//     color: theme.colors.text2,
//     backgroundColor: theme.colors.surface3,
//   },
//   '&[data-state="active"]': {
//     fontWeight: '$semiBold',
//     color: theme.colors.text2,
//   },

//   span: {
//     padding: '2px 4px',
//     marginLeft: '4px',
//     borderRadius: '2px',
//     fontSize: '$mini',
//     backgroundColor: '$gray015',
//     color: '$gray060',
//   },
// });

// export const CollapsibleTrigger = styled(Collapsible.Trigger, {
//   all: 'reset',
//   boxSizing: 'border-box',
//   display: 'flex',
//   alignItems: 'center',
//   cursor: 'pointer',
//   width: 16,
//   height: 16,

//   svg: {
//     path: {
//       fill: theme.colors.text4,
//     },
//   },

//   variants: {
//     isOperationToolsOpen: {
//       true: {
//         transform: 'rotate(180deg)',
//       },
//     },
//   },
// });

// export const CollapsibleContent = styled(Collapsible.Content, {});

// export const TabsContent = styled(Tabs.Content, {
//   // padding: '0 16px 16px 16px',
// });
