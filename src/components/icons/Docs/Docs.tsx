import { theme } from '@/theme';

export const Docs = () => {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.5 6C5.5 8.48528 7.51472 10.5 10 10.5H40.5C41.6046 10.5 42.5 11.3954 42.5 12.5V44.5C42.5 45.6046 41.6046 46.5 40.5 46.5H10C7.51472 46.5 5.5 44.4853 5.5 42V6Z"
        fill={theme.colors.scale600.value}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42 9.33682V3.5C42 1.567 40.433 0 38.5 0H10C6.68629 0 4 2.68629 4 6V42C4 45.3137 6.68629 48 10 48H40.5C42.433 48 44 46.433 44 44.5V12.5C44 11.1038 43.1825 9.89855 42 9.33682ZM7 6C7 4.34315 8.34315 3 10 3H38.5C38.7761 3 39 3.22386 39 3.5V9H10C8.34315 9 7 7.65685 7 6ZM7 42V11.1973C7.88252 11.7078 8.90714 12 10 12H40.5C40.7761 12 41 12.2239 41 12.5V44.5C41 44.7761 40.7761 45 40.5 45H10C8.34315 45 7 43.6569 7 42Z"
        fill={theme.colors.scale600.value}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 22L30 22L30 25L16 25L16 22Z"
        fill={theme.colors.scale100.value}
      />
    </svg>
  );
};
