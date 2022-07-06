import { GraphQLIcon, styled } from '@graphiql-v2-prototype/graphiql-ui-library';

import { VisuallyHidden } from './VisuallyHidden';

const NavContainerStyled = styled('div', {
  height: '100%',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRight: '1px solid $gray015',
});

const Nav = styled('nav', {
  padding: '24px 0',

  ul: {
    all: 'unset',
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
  },
});

const NavButton = styled('button', {
  height: 32,
  width: 32,
  padding: 4,

  '&:hover': {
    svg: {
      path: {
        fill: '$primary100',
      },
    },
  },
});

export const NavContainer = () => {
  return (
    <NavContainerStyled>
      <Nav aria-labelledby="plugins-navigation">
        <VisuallyHidden>
          <h2 id="plugins-navigation">Plugins navigation</h2>
        </VisuallyHidden>
        <ul>
          <li>
            <NavButton>
              <GraphQLIcon />
            </NavButton>
          </li>
          <li>
            <NavButton>
              <GraphQLIcon />
            </NavButton>
          </li>
          <li>
            <NavButton>
              <GraphQLIcon />
            </NavButton>
          </li>
        </ul>
      </Nav>
      <Nav aria-labelledby="dialogs-navigation">
        <VisuallyHidden>
          <h2 id="dialogs-navigation">Dialogs navigation</h2>
        </VisuallyHidden>
        <ul>
          <li>
            <NavButton>
              <GraphQLIcon />
            </NavButton>
          </li>
          <li>
            <NavButton>
              <GraphQLIcon />
            </NavButton>
          </li>
        </ul>
      </Nav>
    </NavContainerStyled>
  );
};
