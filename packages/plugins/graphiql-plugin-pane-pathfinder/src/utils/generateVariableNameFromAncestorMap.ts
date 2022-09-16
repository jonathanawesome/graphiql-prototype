import { AncestorMap } from '../hooks';
import { capitalize } from '../utils';

export const generateVariableNameFromAncestorMap = ({
  ancestors,
}: {
  ancestors: AncestorMap;
}) => {
  const keys = [...ancestors.keys()];
  console.log('keys', keys);
  const trimmed = keys
    // .slice(0, -1)
    .reverse()
    .map((k, index) => {
      const [first] = k.split('-');
      if (index !== 0) {
        return capitalize(first);
      }
      return first;
    });
  return trimmed.join('');
};
