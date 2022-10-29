import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledArguments = styled('div', {
  position: 'relative',
  marginBottom: theme.space[2],
  // marginLeft: theme.space[2],
});

export const StyledArgumentsLeadWrap = styled('div', {
  width: `100%`,
  display: `flex`,
  alignItems: 'center',
  gap: theme.space[2],

  button: {
    svg: {
      transform: 'rotate(-90deg)',
    },
  },

  span: {
    fontSize: 10,
    textTransform: `uppercase`,
    letterSpacing: 0.5,
    color: theme.colors.text2,
  },

  variants: {
    isExpanded: {
      true: {
        button: {
          svg: {
            transform: 'rotate(0deg)',
            path: {
              fill: theme.colors.pink_default,
            },
          },
        },
      },
      false: {},
    },
  },
});

export const StyledArgumentsContent = styled('div', {
  width: `100%`,
  // display: `none`,
  paddingLeft: theme.space[5],
  marginTop: theme.space[1],
  marginLeft: 6,
  position: `relative`,

  '&::after': {
    content: '',
    position: `absolute`,
    top: 0,
    left: 7,
    height: `100%`,
    width: 1,
    // backgroundColor: theme.colors.pink_default,
    hairlineL: theme.colors.pink_default,
  },

  // variants: {
  //   isExpanded: {
  //     true: { display: 'block', marginBottom: theme.space[3] },
  //     false: { display: 'none' },
  //   },
  // },
});

export const StyledArgumentsList = styled('ul', {
  all: 'unset',
  margin: 0,
  overflow: `hidden`,
  display: 'flex',
  flexDirection: 'column',
  position: `relative`,
});
