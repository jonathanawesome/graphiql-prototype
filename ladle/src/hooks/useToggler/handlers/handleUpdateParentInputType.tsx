import { ArgumentNode, Kind } from 'graphql';

/** types */
import { AncestorInputType, NextArguments, SetNextArgumentsSignature } from '../types';

export const handleUpdateParentInputType = ({
  ancestor,
  nextArguments,
  setNextArguments,
}: {
  ancestor: AncestorInputType;
  nextArguments: NextArguments;
  setNextArguments: SetNextArgumentsSignature;
}) => {
  console.log(`running handleUpdateParentInputType`, {
    ancestor,
    nextArguments,
  });
  const copyParent = ancestor.parent;

  /** this is all pretty gross, but will eventually to be refactored to handle nested input arguments */
  let invalidateNextArgument = false;

  if (
    nextArguments &&
    nextArguments[0].value.kind === Kind.OBJECT &&
    nextArguments[0].value.fields.length === 0
  ) {
    invalidateNextArgument = true;
  }

  let argumentSiblings: ArgumentNode[] | undefined = undefined;

  if (copyParent) {
    argumentSiblings = copyParent.arguments?.filter(
      (a) => a.name.value !== ancestor.onInputType
    );
  }

  if (!argumentSiblings && invalidateNextArgument) {
    setNextArguments({ nextArguments: null });
  } else if (argumentSiblings && invalidateNextArgument) {
    setNextArguments({ nextArguments: argumentSiblings });
  } else if (argumentSiblings && !invalidateNextArgument && nextArguments) {
    setNextArguments({
      nextArguments: argumentSiblings
        ? [...argumentSiblings, ...nextArguments]
        : [...nextArguments],
    });
  } else if (!argumentSiblings && !invalidateNextArgument && nextArguments) {
    setNextArguments({ nextArguments });
  }
};
