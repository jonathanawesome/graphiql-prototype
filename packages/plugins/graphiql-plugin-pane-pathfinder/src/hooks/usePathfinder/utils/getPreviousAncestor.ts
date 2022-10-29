import { AncestorArgument, AncestorsArray, AncestorTypes } from '../types';

export const getPreviousAncestor = ({
  ancestors,
  target,
}: {
  ancestors: AncestorsArray;
  target: AncestorTypes;
}) => {
  const index = ancestors.findIndex((a) => a === target);

  return ancestors[index - 1] as Exclude<AncestorTypes, AncestorArgument>;
};
