import { styled } from '@stitches/react';
import { theme } from '@/theme';

export const StyledCaret = styled('div', {
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  height: 15,
  width: 15,

  '& svg': {
    height: '100%',
    width: '50%',
  },
});

export const Caret = ({ isExpanded }: { isExpanded: boolean }) => {
  return (
    <StyledCaret>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M16.2192 46.9257L36.5688 26.5761C37.9915 25.1533 37.9915 22.8467 36.5688 21.4239L16.2192 1.07434C13.9241 -1.22068 10 0.404748 10 3.65041L10 44.3496C10 47.5952 13.9241 49.2207 16.2192 46.9257Z"
          fill={isExpanded ? theme.colors.accentField.value : theme.colors.scale600.value}
          style={{
            transformOrigin: 'center center',
            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
        />
      </svg>
    </StyledCaret>
  );
};
