import { isRequiredArgument } from 'graphql';

/** components */
import { FieldDetails, IndicatorArgument } from '../index';

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
      <FieldDetails
        name={`${argument.name}${isRequiredArgument(argument) ? `*` : ''}`}
        description={argument.description || null}
        typeName={argument.type.toString()}
        variant="ARGUMENT"
        isSelected={!!selection}
      />
    </ScalarArgStyled>
  );
};
