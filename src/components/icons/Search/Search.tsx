import { theme } from '@/theme';

export const Search = () => {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5235 33.9708C27.5025 33.9708 33.9708 27.5025 33.9708 19.5235C33.9708 11.5444 27.5025 5.0761 19.5235 5.0761C11.5444 5.0761 5.0761 11.5444 5.0761 19.5235C5.0761 27.5025 11.5444 33.9708 19.5235 33.9708ZM19.5235 39.047C30.306 39.047 39.047 30.306 39.047 19.5235C39.047 8.74096 30.306 0 19.5235 0C8.74096 0 0 8.74096 0 19.5235C0 30.306 8.74096 39.047 19.5235 39.047Z"
        fill={theme.colors.scale600.value}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M44.0953 48L31.2376 35.1423L34.8269 31.5529L47.6847 44.4107L44.0953 48Z"
        fill={theme.colors.scale600.value}
      />
    </svg>
  );
};
