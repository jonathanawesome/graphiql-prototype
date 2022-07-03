import { styled } from '@graphiql-v2-prototype/graphiql-ui-library';

const PathfinderStyled = styled('ul', {
  backgroundColor: 'pink',
});

const CollapserStyled = styled('li', {
  backgroundColor: 'pink',
});

const Collapser = () => {
  return (
    <CollapserStyled>
      <dt>dt</dt>
      <dd>dd</dd>
    </CollapserStyled>
  );
};

export const Pathfinder = () => {
  return (
    <PathfinderStyled>
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
      <Collapser />
    </PathfinderStyled>
  );
};
