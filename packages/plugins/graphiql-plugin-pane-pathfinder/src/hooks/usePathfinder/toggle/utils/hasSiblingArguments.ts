import { AncestorField } from '../../types';

export const hasSiblingArguments = ({
  mode,
  previousAncestor,
}: {
  mode: 'ADD' | 'REMOVE';
  previousAncestor: AncestorField;
}) => {
  // console.log('hasSiblingArguments', { previousAncestor });
  const greaterThan = mode === 'ADD' ? 0 : 1;

  if (
    previousAncestor.selection &&
    'arguments' in previousAncestor.selection &&
    previousAncestor.selection.arguments &&
    previousAncestor.selection.arguments.length > greaterThan
  ) {
    return true;
  }
  return false;
};
