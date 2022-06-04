import { styled } from '@stitches/react';
import { theme } from '@graphiql-v2-prototype/graphiql-v2';

export const StyledIndicatorInputType = styled('div', {
  display: 'flex',
  alignContent: 'center',
  justifyContent: 'center',
  height: 15,
  width: 15,

  '& svg': {
    height: '100%',
    width: '100%',
  },
});

export const IndicatorInputType = ({
  isExpanded,
  isSelected,
}: {
  isExpanded: boolean;
  isSelected: boolean;
}) => {
  return (
    <StyledIndicatorInputType>
      <svg viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.86618 15.0133H3.98381C3.85406 15.0133 3.74853 14.9078 3.74853 14.778V9.83684C3.74853 9.64958 3.67416 9.47007 3.54174 9.33773L2.62914 8.42509L3.54178 7.51244C3.67416 7.38011 3.74853 7.20059 3.74853 7.01333V2.07213C3.74853 1.94237 3.8541 1.83685 3.98381 1.83685H5.86618C6.256 1.83685 6.57208 1.52081 6.57208 1.13095C6.57208 0.741088 6.25604 0.425049 5.86618 0.425049H3.98381C3.07561 0.425049 2.33677 1.16392 2.33677 2.07213V6.72093L1.13177 7.92594C0.856103 8.20156 0.856103 8.64853 1.13177 8.9242L2.33677 10.1292V14.778C2.33677 15.6862 3.07565 16.4251 3.98381 16.4251H5.86618C6.256 16.4251 6.57208 16.1091 6.57208 15.7192C6.57208 15.3294 6.25604 15.0133 5.86618 15.0133Z"
          fill={
            isSelected ? theme.colors.accentArgument.value : theme.colors.scale600.value
          }
        />
        <path
          d="M16.7183 7.92598L15.5133 6.72093V2.07213C15.5133 1.16392 14.7744 0.425049 13.8662 0.425049H11.9838C11.594 0.425049 11.2779 0.741088 11.2779 1.13095C11.2779 1.52081 11.5939 1.83685 11.9838 1.83685H13.8662C13.9959 1.83685 14.1015 1.94242 14.1015 2.07213V7.01333C14.1015 7.20059 14.1758 7.38011 14.3083 7.51244L15.2209 8.42509L14.3083 9.33773C14.1759 9.47007 14.1015 9.64958 14.1015 9.83684V14.778C14.1015 14.9078 13.9959 15.0133 13.8662 15.0133H11.9839C11.594 15.0133 11.278 15.3294 11.278 15.7192C11.278 16.1091 11.594 16.4251 11.9839 16.4251H13.8662C14.7744 16.4251 15.5133 15.6862 15.5133 14.778V10.1292L16.7183 8.92424C16.9939 8.64862 16.9939 8.20164 16.7183 7.92598Z"
          fill={
            isSelected ? theme.colors.accentArgument.value : theme.colors.scale600.value
          }
        />
        <path
          d="M5.78168 7.51682L8.74932 10.4845C8.9568 10.692 9.2932 10.692 9.50068 10.4845L12.4683 7.51682C12.803 7.18213 12.566 6.60986 12.0926 6.60986L6.15735 6.60986C5.68403 6.60986 5.44698 7.18213 5.78168 7.51682Z"
          fill={isExpanded ? theme.colors.accentField.value : theme.colors.scale600.value}
          style={{
            //TODO: this path is centered when it's not expanded
            transformOrigin: 'center center',
            transform: isExpanded ? 'rotate(0deg)' : 'rotate(-90deg)',
          }}
        />
      </svg>
    </StyledIndicatorInputType>
  );
};
