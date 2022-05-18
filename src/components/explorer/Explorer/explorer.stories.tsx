/** components */
import { Explorer } from '@/components';

/** hooks */
import { useGraphiQL } from '@/hooks';

export const ExplorerStory = () => {
  const { operation } = useGraphiQL();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `300px 1fr`, height: `100%` }}>
      <Explorer />
      {operation && <div>{operation}</div>}
    </div>
  );
};

ExplorerStory.storyName = 'Explorer';
