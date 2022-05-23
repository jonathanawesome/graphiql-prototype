import { theme } from '@/theme';

export const Play = () => {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0 8C0 3.58172 3.58172 0 8 0H40C44.4183 0 48 3.58172 48 8V40C48 44.4183 44.4183 48 40 48H8C3.58172 48 0 44.4183 0 40V8Z"
        fill={theme.colors.accentArgument.value}
      />
      <path
        d="M15.6 14.8609C15.6 14.1073 16.4019 13.6245 17.0679 13.9771L34.3306 23.1162C35.0401 23.4918 35.0401 24.5081 34.3306 24.8837L17.0679 34.0228C16.4019 34.3754 15.6 33.8926 15.6 33.139L15.6 14.8609Z"
        fill={theme.colors.scale100.value}
      />
    </svg>
  );
};