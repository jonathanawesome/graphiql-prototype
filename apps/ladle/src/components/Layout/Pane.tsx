import { styled } from '@graphiql-prototype/ui-library';

import { Pathfinder } from './Pathfinder';

const PaneStyled = styled('div', {
  border: '2px dashed red',
  height: 'calc(100% - 48px)',
  width: 'calc(100% - 48px)',
  margin: 24,
  overflowY: 'auto',
});

export const Pane = () => {
  return (
    <PaneStyled>
      <Pathfinder />
    </PaneStyled>
  );
};
