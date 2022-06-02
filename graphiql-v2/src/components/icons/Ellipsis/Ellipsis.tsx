import { theme } from '../../../theme';

export const Ellipsis = () => {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse
        cx="23.7893"
        cy="3.78934"
        rx="3.78934"
        ry="3.78934"
        fill={theme.colors.scale600.value}
      />
      <circle cx="23.7893" cy="23.9989" r="3.78934" fill={theme.colors.scale600.value} />
      <ellipse
        cx="23.7893"
        cy="44.2107"
        rx="3.78934"
        ry="3.78933"
        fill={theme.colors.scale600.value}
      />
    </svg>
  );
};
