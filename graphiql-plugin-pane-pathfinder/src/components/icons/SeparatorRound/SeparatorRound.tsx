import { theme } from '@graphiql-v2-prototype/graphiql-v2';

export const SeparatorRound = () => {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="24" fill={theme.colors.scale600.value} />
    </svg>
  );
};