import { styled } from '@stitches/react';
import { theme } from '@/theme';

export const StyledIndicatorArgument = styled('div', {
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  height: 15,
  width: 15,
  cursor: 'pointer',

  '& svg': {
    height: '100%',
    width: '100%',
  },
});

export const IndicatorArgument = ({ isSelected }: { isSelected: boolean }) => {
  return (
    <StyledIndicatorArgument>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.02293 28.8838C-0.674311 26.1865 -0.674311 21.8134 2.02293 19.1162L19.1162 2.02293C21.8134 -0.674311 26.1865 -0.674311 28.8838 2.02293L45.9771 19.1162C48.6743 21.8134 48.6743 26.1865 45.9771 28.8838L28.8838 45.9771C26.1865 48.6743 21.8134 48.6743 19.1162 45.9771L2.02293 28.8838Z"
          fill={isSelected ? theme.colors.accentArgument.value : undefined}
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M21.2375 4.14425L4.14425 21.2375C2.61858 22.7632 2.61858 25.2368 4.14425 26.7625L21.2375 43.8557C22.7632 45.3814 25.2368 45.3814 26.7625 43.8557L43.8557 26.7625C45.3814 25.2368 45.3814 22.7632 43.8557 21.2375L26.7625 4.14425C25.2368 2.61858 22.7632 2.61858 21.2375 4.14425ZM2.02293 19.1162C-0.674311 21.8135 -0.674311 26.1866 2.02293 28.8838L19.1162 45.9771C21.8135 48.6743 26.1866 48.6743 28.8838 45.9771L45.9771 28.8838C48.6743 26.1866 48.6743 21.8135 45.9771 19.1162L28.8838 2.02293C26.1866 -0.674311 21.8135 -0.674311 19.1162 2.02293L2.02293 19.1162Z"
          fill={
            isSelected ? theme.colors.accentArgument.value : theme.colors.scale600.value
          }
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M34.5956 19.9311L22.1406 32.3782L13.849 24.0948L17.0295 20.9113L22.14 26.0168L31.4147 16.7481L34.5956 19.9311Z"
          fill={isSelected ? theme.colors.scale100.value : undefined}
        />
      </svg>
    </StyledIndicatorArgument>
  );
};
