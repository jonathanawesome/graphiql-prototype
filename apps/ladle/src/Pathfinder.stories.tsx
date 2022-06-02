import { useGraphiQL } from '@graphiql-v2-prototype/graphiql-v2';

/** components */
import { Pathfinder } from '@graphiql-v2-prototype/graphiql-plugin-pathfinder';

export const PathfinderStory = () => {
  const { operation } = useGraphiQL();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `1fr 200px`, height: `100%` }}>
      <Pathfinder />
      {operation && <div>{operation}</div>}
    </div>
  );
};

PathfinderStory.storyName = 'Pathfinder';
