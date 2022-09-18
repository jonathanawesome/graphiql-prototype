import { AncestorMap } from '../hooks';
import { capitalize } from '../utils';

export const generateVariableNameFromAncestorMap = ({
  ancestors,
  variableType,
}: {
  ancestors: AncestorMap;
  variableType: 'ARGUMENT' | 'INPUT_FIELD';
}) => {
  let keys = [...ancestors.keys()];

  // console.log('keys before', { keys, variableType });

  // a
  keys = keys.reverse();

  if (variableType === 'INPUT_FIELD') {
    keys = keys.slice(0, -1);
  }

  // console.log('keys after', { keys, variableType });

  const trimmed = keys
    // .slice(0, -1)
    // .reverse()
    .map((k, index) => {
      const [first] = k.split('-');
      if (index !== 0) {
        return capitalize(first);
      }
      return first;
    });
  return trimmed.join('');
};
