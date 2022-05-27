// import { GraphQLArgument, GraphQLField, isRequiredArgument } from 'graphql';

/** styles */
import { Description, FieldDetailsStyled, NameAndTypeName } from './styles';

type FieldDetailsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // fieldOrArg: GraphQLField<any, any> | GraphQLArgument;
  // inlineDescription?: boolean;
  name: string;
  description: string | null;
  // isRequired: boolean;
  typeName: string | null;
  variant: 'FIELD' | 'INLINE_FRAGMENT' | 'ARGUMENT' | 'INPUT_TYPE';
  isSelected: boolean;
};

export const FieldDetails = ({
  name,
  description = null,
  // isRequired,
  typeName,
  variant,
  // fieldOrArg,
  // inlineDescription = true,
  isSelected,
}: FieldDetailsProps) => {
  return (
    <FieldDetailsStyled
      active={isSelected}
      // inlineDescription={inlineDescription}
      type={variant}
    >
      <NameAndTypeName>
        <span>
          {name}
          {/* {!(variant === 'ARGUMENT') && isRequired && '*'} */}
        </span>
        {typeName && <span>{typeName}</span>}
      </NameAndTypeName>
      {description && (
        <Description>
          <span>{description}</span>
        </Description>
      )}
    </FieldDetailsStyled>
  );
};
