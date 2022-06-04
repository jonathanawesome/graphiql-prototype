import { styled } from '@graphiql-v2-prototype/graphiql-v2';

export const StyledCaret = styled('div', {
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  height: 13,
  width: 13,

  '& svg': {
    transformOrigin: 'center center',
    transition: 'all .15s ease',
    height: '100%',
    width: '50%',

    path: {
      fill: '$scale600',
    },
  },

  variants: {
    isExpanded: {
      true: {
        svg: {
          transform: 'rotate(90deg)',
          path: {
            fill: '$accentField',
          },
        },
      },
    },
  },
});

export const Caret = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <StyledCaret isExpanded={isExpanded}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.2192 46.9257L36.5688 26.5761C37.9915 25.1533 37.9915 22.8467 36.5688 21.4239L16.2192 1.07434C13.9241 -1.22068 10 0.404748 10 3.65041L10 44.3496C10 47.5952 13.9241 49.2207 16.2192 46.9257Z" />
      </svg>
    </StyledCaret>
  );
};
