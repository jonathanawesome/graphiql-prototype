import { AncestorRoot, AncestorsArray } from '../types';

export const getRootAncestor = ({ ancestors }: { ancestors: AncestorsArray }) => {
  return ancestors[0] as AncestorRoot;
};
