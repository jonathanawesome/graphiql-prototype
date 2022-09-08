import { styled, theme } from '@graphiql-prototype/ui-library';
import * as Collapsible from '@radix-ui/react-collapsible';

export const RequiredArguments = styled('div', {
  // marginBottom: 8,
  // borderLeft: '1px solid red',
});

export const Span = styled('span', {
  display: 'inline-flex',
  alignContent: 'center',
  fontWeight: '$medium',
  fontSize: theme.fontSizes.body,
  lineHeight: 1,
  height: 15,
  // color: '$gray060',
  color: theme.colors.text3,
  marginLeft: theme.space[2],
  marginTop: 2,
  whiteSpace: 'nowrap',
});

export const ShowArgumentsIconWrap = styled('div', {
  height: 14,
  width: 30,
  position: 'relative',
  display: 'flex',

  svg: {
    height: 14,
    width: 30,
    path: {
      '&:nth-of-type(1)': {
        fill: theme.colors.text3,
      },
      '&:nth-of-type(2)': {
        fill: theme.colors.text3,
      },
      '&:nth-of-type(3)': {
        fill: theme.colors.text3,
      },
    },
  },
});

export const Root = styled(Collapsible.Root, {
  position: 'relative',
  backgroundColor: 'red',
});

export const Trigger = styled(Collapsible.Trigger, {
  display: 'flex',
  alignItems: 'center',

  variants: {
    isExpanded: {
      false: {},
      true: {
        marginBottom: theme.space[3],
      },
    },
  },
});

export const Content = styled(Collapsible.Content, {
  ul: {
    marginBottom: theme.space[3],
  },
});
