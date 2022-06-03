import { styled } from '@stitches/react';

import { theme } from '@graphiql-v2-prototype/graphiql-v2';

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
    fontWeight: theme.fontWeights.medium.value,
    fontSize: 12,
    color: theme.colors.scale700.value,
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
