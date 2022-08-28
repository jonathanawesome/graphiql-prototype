// components
import { SeparatorRound } from '@graphiql-prototype/ui-library';

// styles
import { Description, ListItemStyled, NameAndType, Name, Type } from './styles';

export type ListItemProps = {
  name: string;
  description: string | null;
  descriptionPlacement?: 'Inline' | 'Below' | 'Off';
  entityType?: 'FIELD' | 'INLINE_FRAGMENT' | 'ARGUMENT' | 'INPUT_TYPE';
  isSelected?: boolean;
  type: string | React.ReactElement<HTMLButtonElement>;
};

export const ListItem = ({
  name,
  description = null,
  descriptionPlacement = 'Below',
  isSelected,
  type,
  entityType,
}: ListItemProps) => {
  // console.log('rendering Describe', {
  //   name,
  //   type,
  // });

  return (
    <ListItemStyled
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
    </ListItemStyled>
  );
};
