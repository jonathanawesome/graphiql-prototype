import { isRequiredArgument } from 'graphql';

/** components */
import { Describe, IndicatorArgument } from '../index';

/** hooks */
import { AncestorArgument, AncestorMap, usePathfinder } from '../../hooks';

/** styles */
import { ScalarArgStyled } from './styles';

const toggle = usePathfinder.getState().toggle;

export const ScalarArg = ({ ancestors }: { ancestors: AncestorMap }) => {
  const { argument, selection } = ancestors.values().next().value as AncestorArgument;

  // console.log('ScalarArg', {
  //   // arg,
  //   ancestors,
  //   self,
  //   argument,
  //   selection,
  //   // selection,
  // });

  return (
    <ScalarArgStyled>
      <button onClick={() => toggle({ ancestors })}>
        <IndicatorArgument isSelected={!!selection} />
      </button>
      <Describe
        name={`${argument.name}${isRequiredArgument(argument) ? `*` : ''}`}
        description={argument.description || null}
        isSelected={!!selection}
        type={argument.type}
        variant="ARGUMENT"
      />
    </ScalarArgStyled>
  );
};
