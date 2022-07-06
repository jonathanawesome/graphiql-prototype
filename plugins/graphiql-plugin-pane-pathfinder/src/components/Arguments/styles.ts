import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';
import * as Collapsible from '@radix-ui/react-collapsible';

export const RequiredArguments = styled('div', {
  // marginBottom: 8,
  // borderLeft: '1px solid red',
});

export const Span = styled('span', {
  display: 'inline-flex',
  alignContent: 'center',
  fontWeight: '$medium',
  fontSize: 12,
  lineHeight: 1,
  height: 15,
  color: '$gray060',
  marginLeft: 8,
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
        fill: '$gray060',
      },
      '&:nth-of-type(2)': {
        fill: '$gray060',
      },
      '&:nth-of-type(3)': {
        fill: '$gray060',
      },
    },
  },
});

export const Root = styled(Collapsible.Root, {
  position: 'relative',
});

export const Trigger = styled(Collapsible.Trigger, {
  display: 'flex',
  alignItems: 'center',

  variants: {
    isExpanded: {
      false: {},
      true: {
        marginBottom: 12,
      },
    },
  },
});

export const Content = styled(Collapsible.Content, {
  ul: {
    marginBottom: 12,
  },
});
