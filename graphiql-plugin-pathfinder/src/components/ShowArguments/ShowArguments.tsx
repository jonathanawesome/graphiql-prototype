import { styled } from '@stitches/react';

/** components */
import { ShowArgumentsIcon } from '../index';

export const StyledShowArguments = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',
  height: 16,
  // marginTop: 10,

  svg: {
    height: 24,
    width: 24,
  },

  span: {
    fontWeight: `$medium`,
    fontSize: 12,
    color: `$scale700`,
    marginTop: -3,
  },
});

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
