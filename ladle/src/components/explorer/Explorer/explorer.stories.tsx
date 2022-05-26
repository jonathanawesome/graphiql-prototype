/** components */
import { Explorer } from '@/components';

/** hooks */
import { useOperation } from '@/hooks';

export const ExplorerStory = () => {
  const { operation } = useOperation();

  return (
    <div style={{ display: 'grid', gridTemplateColumns: `1fr 200px`, height: `100%` }}>
      <Explorer />
      {operation && <div>{operation}</div>}
    </div>
  );
};

ExplorerStory.storyName = 'Explorer';
