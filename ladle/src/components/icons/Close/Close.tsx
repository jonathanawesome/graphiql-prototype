import { theme } from '@/theme';

export const Close = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 6L17.9998 17.9997"
        stroke={theme.colors.scale600.value}
        strokeWidth="1.5"
      />
      <path
        d="M18 6L6.00079 18.0003"
        stroke={theme.colors.scale600.value}
        strokeWidth="1.5"
      />
    </svg>
  );
};
