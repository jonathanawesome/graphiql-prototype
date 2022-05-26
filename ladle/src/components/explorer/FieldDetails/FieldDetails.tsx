import { GraphQLArgument, GraphQLField, isRequiredArgument } from 'graphql';

/** components */
import { SeparatorRound } from '@/components';

/** styles */
import { Description, FieldDetailsStyled, NameAndTypeName } from './styles';

type FieldDetailsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fieldOrArg: GraphQLField<any, any> | GraphQLArgument;
  inlineDescription?: boolean;
  isSelected: boolean;
};

export const FieldDetails = ({
  fieldOrArg,
  inlineDescription = true,
  isSelected,
}: FieldDetailsProps) => {
  return (
    <FieldDetailsStyled
      active={isSelected}
      inlineDescription={inlineDescription}
      type={'args' in fieldOrArg ? 'field' : 'argument'}
    >
      <NameAndTypeName>
        {!('args' in fieldOrArg) ? (
          <span>
            {fieldOrArg.name}
            {isRequiredArgument(fieldOrArg) && '*'}
          </span>
        ) : (
          <span>{fieldOrArg.name}</span>
        )}
        <span>{fieldOrArg.type.toString()}</span>
      </NameAndTypeName>
      {fieldOrArg.description && (
        <Description>
          <SeparatorRound />
          <span>{fieldOrArg.description}</span>
        </Description>
      )}
    </FieldDetailsStyled>
  );
};
