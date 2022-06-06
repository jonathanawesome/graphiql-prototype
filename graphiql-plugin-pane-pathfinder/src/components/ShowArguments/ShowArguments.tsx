/** components */
import { ShowArgumentsIcon } from '../index';

/** styles */
import { StyledShowArguments } from './styles';

export const ShowArguments = ({
  isOpen,
  optionalArgsCount,
  requiredArgsCount,
}: {
  isOpen: boolean;
  optionalArgsCount: number;
  requiredArgsCount: number;
}) => {
  return (
    <StyledShowArguments>
      <ShowArgumentsIcon />
      {/* //TODO fix this nested ternary */}
      {isOpen ? (
        <span>Hide Arguments</span>
      ) : requiredArgsCount > 0 ? (
        <span>{optionalArgsCount.toString()} more arguments</span>
      ) : (
        <span>Show Arguments</span>
      )}
    </StyledShowArguments>
  );
};
