import { AncestorMap } from '../hooks';
import { capitalize } from '../utils';

// TODO: DEPRECATED!
export const generateVariableNameFromAncestorMap = ({
  ancestors,
  variableType,
}: {
  ancestors: AncestorMap;
  variableType: 'ARGUMENT' | 'INPUT_FIELD';
}) => {
  let keys = [...ancestors.keys()];

  keys = keys.reverse();

  if (variableType === 'INPUT_FIELD') {
    keys = keys.slice(0, -1);
  }

  const trimmed = keys.map((k, index) => {
    const [first] = k.split('-');
    if (index !== 0) {
      return capitalize(first);
    }
    return first;
  });
  return trimmed.join('');
};
