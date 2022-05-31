/** types */
import { AncestorRoot, NextSelectionSet } from '../types';

export const handleRoot = ({
  ancestor,
  nextSelectionSet,
}: {
  ancestor: AncestorRoot;
  nextSelectionSet: NextSelectionSet;
}) => {
  /**
   * TODO: figure out how to use this to mark our operation type
   */
  return console.log(`on the root:`, {
    rootTypeName: ancestor.rootTypeName,
    nextSelectionSet,
  });
};
