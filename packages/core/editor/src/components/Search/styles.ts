import { styled, theme } from '@graphiql-prototype/ui-library';

export const StyledSearch = styled('div', {
  height: '100%',
  width: '100%',
  display: `flex`,
  position: `absolute`,
  top: 0,
  right: 0,
  zIndex: 6,

  button: {
    height: 47,

    svg: {
      height: 20,
      width: 20,
    },
  },

  input: {
    all: `unset`,
    boxSizing: 'border-box',
    width: `100%`,
    height: `100%`,
    paddingRight: theme.space[3],
    fontSize: theme.fontSizes.body,
    backgroundColor: theme.colors.surface1,
    color: theme.colors.text2,
    textAlign: `right`,

    '&::placeholder': {
      color: theme.colors.text4,
    },
    '&:focus, &:hover': {},
  },

  variants: {
    isActive: {
      true: {
        button: {
          svg: {
            height: 16,
            width: 16,
          },
        },
      },
      false: {
        width: 48,
        input: {
          display: `none`,
        },
      },
    },
  },
});

export const StyledSearchTriggerWrap = styled('div', {});
