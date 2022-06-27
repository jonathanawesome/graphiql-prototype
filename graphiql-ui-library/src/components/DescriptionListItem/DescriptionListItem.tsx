// components
import { SeparatorRound } from '../../icons';

// styles
import {
  Description,
  DescriptionListItemStyled,
  NameAndType,
  Name,
  Type,
} from './styles';

export type DescriptionListItemProps = {
  name: string;
  description: string | null;
  descriptionPlacement?: 'Inline' | 'Below' | 'Off';
  entityType?: 'FIELD' | 'INLINE_FRAGMENT' | 'ARGUMENT' | 'INPUT_TYPE';
  isSelected?: boolean;
  type: string | React.ReactElement<HTMLButtonElement>;
};

export const DescriptionListItem = ({
  name,
  description = null,
  descriptionPlacement = 'Below',
  isSelected,
  type,
  entityType,
}: DescriptionListItemProps) => {
  // console.log('rendering Describe', {
  //   name,
  //   type,
  // });

  return (
    <DescriptionListItemStyled
      descriptionPlacement={descriptionPlacement}
      entityType={entityType}
      isSelected={isSelected}
    >
      <NameAndType>
        <Name>{name}</Name>
        <Type>{type}</Type>
      </NameAndType>
      {description && (
        <Description>
          <SeparatorRound />
          <span>{description}</span>
        </Description>
      )}
    </DescriptionListItemStyled>
  );
};
