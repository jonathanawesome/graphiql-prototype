/** styles */
import { Description, FieldDetailsStyled, NameAndTypeName } from './styles';

type FieldDetailsProps = {
  name: string;
  description: string | null;
  isSelected: boolean;
  typeName: string | null;
  variant: 'FIELD' | 'INLINE_FRAGMENT' | 'ARGUMENT' | 'INPUT_TYPE';
};

export const FieldDetails = ({
  name,
  description = null,
  isSelected,
  typeName,
  variant,
}: FieldDetailsProps) => {
  // console.log('rendering FieldDetails', { name, isSelected, variant });

  return (
    <FieldDetailsStyled
      isSelected={isSelected}
      // inlineDescription={inlineDescription}
      type={variant}
    >
      <NameAndTypeName>
        <span>{name}</span>
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
