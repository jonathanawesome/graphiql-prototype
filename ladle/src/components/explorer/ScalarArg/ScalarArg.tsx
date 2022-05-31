import {
  // ArgumentNode,
  // FieldNode,
  // GraphQLArgument,
  // isEnumType,
  // isNonNullType,
  isRequiredArgument,
  // ObjectFieldNode,
} from 'graphql';

/** components */
import { FieldDetails, IndicatorArgument } from '@/components';

/** styles */
import { ScalarArgStyled } from './styles';
import { AncestorFieldArgument, AncestorMap, useToggler } from '@/hooks';

const toggle = useToggler.getState().toggle;

export const ScalarArg = ({ ancestors }: { ancestors: AncestorMap }) => {
  const self = ancestors.values().next().value as AncestorFieldArgument;

  const { arg, selection } = self;

  // console.log('ScalarArg', {
  //   // arg,
  //   ancestors,
  //   self,
  //   arg,
  //   selection,
  //   // selection,
  // });

  return (
    <ScalarArgStyled>
      <button onClick={() => toggle({ ancestors })}>
        <IndicatorArgument isSelected={!!selection} />
      </button>
      <FieldDetails
        name={`${arg.name}${isRequiredArgument(arg) ? `*` : ''}`}
        description={arg.description || null}
        typeName={arg.type.toString()}
        variant="ARGUMENT"
        isSelected={!!selection}
      />
    </ScalarArgStyled>
  );
};
