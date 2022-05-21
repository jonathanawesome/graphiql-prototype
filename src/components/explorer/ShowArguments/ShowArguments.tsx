import { styled } from '@stitches/react';

/** components */
import { Arguments } from '@/components';

export const StyledShowArguments = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  cursor: 'pointer',

  svg: {
    height: 30,
    width: 30,
  },

  span: {
    fontWeight: `$medium`,
    fontSize: '$body',
    color: `$scale700`,
  },
});

export const ShowArguments = ({
  isArgsExpanded,
  optionalArgsCount,
  requiredArgsCount,
}: {
  isArgsExpanded: boolean;
  optionalArgsCount: number;
  requiredArgsCount: number;
}) => {
  return (
    <StyledShowArguments>
      <Arguments />
      {/* //TODO fix this nested ternary */}
      {isArgsExpanded ? (
        <span>Hide Arguments</span>
      ) : requiredArgsCount > 0 ? (
        <span>{optionalArgsCount.toString()} more arguments</span>
      ) : (
        <span>Show Arguments</span>
      )}
    </StyledShowArguments>
  );
};
