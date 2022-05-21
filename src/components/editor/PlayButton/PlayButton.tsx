/** components */
import { Play } from '@/components';

/** hooks */
import { useOperation } from '@/hooks';

/** styles */
import { PlayButtonStyled } from './styles';

export const PlayButton = () => {
  const { executeOperation } = useOperation();

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
