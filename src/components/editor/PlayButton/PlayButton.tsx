/** components */
import { Play } from '@/components';

/** hooks */
import { useGraphiQL } from '@/hooks';

/** styles */
import { PlayButtonStyled } from './styles';

export const PlayButton = () => {
  const { executeOperation } = useGraphiQL();

  return (
    <PlayButtonStyled
      onClick={() => {
        // console.log('play button');

        executeOperation();
      }}
    >
      <Play />
    </PlayButtonStyled>
  );
};
