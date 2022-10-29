import { AncestorField } from '../../types';

export const getSelectedArgumentsCount = ({
  previousAncestor,
}: {
  previousAncestor: AncestorField;
}): number => {
  if (
    previousAncestor.selection &&
    'arguments' in previousAncestor.selection &&
    previousAncestor.selection.arguments
  ) {
    return previousAncestor.selection.arguments.length;
  }
  return 0;
};
