import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledScalarArgWrap = styled('div', {
  // height: '100%',
  // width: '100%',
  // overflowY: 'auto',
  // padding: theme.space[6],
  // margin: 0,
  // display: 'flex',
  // gap: 4,
  // height: 30,
  // alignItems: `center`,
  // width: `100%`,
  marginTop: 4,
  marginBottom: 4,
});

export const StyledError = styled('div', {
  color: theme.colors.red_default,
  backgroundColor: theme.colors.red_lightest,
  borderTop: `1px solid ${theme.colors.red_light}`,
  borderRight: `1px solid ${theme.colors.red_light}`,
  borderBottom: `1px solid ${theme.colors.red_light}`,
  borderLeft: `1px solid ${theme.colors.red_light}`,
  fontSize: 10,
  padding: 2,
  // borderRadius: 2,
  marginTop: 4,
  marginBottom: 4,
});

// export const Wrap = styled('div', {
//   // height: '100%',
//   // width: '100%',
//   // overflowY: 'auto',
//   // padding: theme.space[6],
//   // margin: 0,
//   display: 'flex',
//   gap: 4,
//   height: 30,
//   alignItems: `center`,
//   width: `100%`,
//   marignTop: 10,
// });

// export const StyledSVG = styled('div', {
//   cursor: `pointer`,
//   height: 16,
//   width: 16,
//   // overflowY: 'auto',
//   // padding: theme.space[6],
//   // margin: 0,
//   display: 'flex',
//   alignItems: `center`,
//   justifyContent: `center`,

//   svg: {
//     height: 10,
//     width: 10,
//     path: {
//       fill: theme.colors.text4,
//     },
//   },

//   '&:hover': {
//     svg: {
//       path: {
//         fill: theme.colors.text1,
//       },
//     },
//   },

//   variants: {
//     isInputField: {
//       true: {
//         svg: {
//           path: {
//             fill: theme.colors.orange_light,
//           },
//         },
//         '&:hover': {
//           svg: {
//             path: {
//               fill: theme.colors.orange_default,
//             },
//           },
//         },
//       },
//       false: {
//         svg: {
//           path: {
//             fill: theme.colors.pink_light,
//           },
//         },
//         '&:hover': {
//           svg: {
//             path: {
//               fill: theme.colors.pink_default,
//             },
//           },
//         },
//       },
//     },
//     isActive: {
//       true: {
//         svg: {
//           path: {
//             '&:nth-of-type(1)': {
//               // fill: theme.colors.text4,
//               fill: 'transparent',
//             },
//           },
//         },
//         '&:hover': {
//           svg: {
//             path: {
//               '&:nth-of-type(1)': {
//                 // fill: theme.colors.text4,
//                 fill: 'transparent',
//               },
//             },
//           },
//         },
//       },
//     },
//   },
// });
