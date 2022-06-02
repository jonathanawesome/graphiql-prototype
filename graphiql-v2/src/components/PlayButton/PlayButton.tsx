/** components */
import { Play } from '../index';

/** hooks */
import { useGraphiQL } from '../../hooks';

/** styles */
import { PlayButtonStyled } from './styles';

export const PlayButton = () => {
  const { executeOperation } = useGraphiQL();

  return (
    <PlayButtonStyled onClick={() => executeOperation()}>
      <Play />
    </PlayButtonStyled>
  );
};
