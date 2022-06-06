import { styled, theme } from '@graphiql-v2-prototype/graphiql-v2';

export const Wrap = styled('svg', {
  transition: 'all .12s ease',
});

export const IndicatorField = ({ active }: { active: boolean }) => {
  return (
    <Wrap viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M44.3077 23.9999C44.3077 35.2156 35.2156 44.3076 24 44.3076C12.7844 44.3076 3.69232 35.2156 3.69232 23.9999C3.69232 12.7843 12.7844 3.69226 24 3.69226C35.2156 3.69226 44.3077 12.7843 44.3077 23.9999Z"
        fill={active ? theme.colors.accentField.value : undefined}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 44.3077C35.2156 44.3077 44.3077 35.2156 44.3077 24C44.3077 12.7844 35.2156 3.69231 24 3.69231C12.7844 3.69231 3.69231 12.7844 3.69231 24C3.69231 35.2156 12.7844 44.3077 24 44.3077ZM24 48C37.2548 48 48 37.2548 48 24C48 10.7452 37.2548 0 24 0C10.7452 0 0 10.7452 0 24C0 37.2548 10.7452 48 24 48Z"
        fill={active ? theme.colors.accentField.value : theme.colors.scale600.value}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.302 19.66L22.0166 32.9369L13.1723 24.1013L16.5647 20.7055L22.016 26.1515L31.909 16.2648L35.302 19.66Z"
        fill={active ? theme.colors.scale100.value : undefined}
      />
    </Wrap>
  );
};
