// components
import { Markdown, SeparatorRound } from '@graphiql-prototype/ui-library';

// styles
import {
  Description,
  ListItemStyled,
  NameAndType,
  Name,
  Type,
  StyledDescription,
} from './styles';

export type ListItemProps = {
  name: string | React.ReactElement<HTMLButtonElement>;
  description: string | null;
  descriptionPlacement?: 'Inline' | 'Below' | 'Off';
  entityType?: 'FIELD' | 'INLINE_FRAGMENT' | 'ARGUMENT' | 'INPUT_TYPE';
  isSelected?: boolean;
  type: string | React.ReactElement<HTMLButtonElement>;
};

export const ListItem = ({
  name,
  description = null,
  isSelected,
  type,
  entityType,
}: ListItemProps) => {
  // console.log('rendering Describe', {
  //   name,
  //   type,
  // });

  return (
    <ListItemStyled entityType={entityType} isSelected={isSelected}>
      <NameAndType>
        <Name>{name}</Name>
        <Type>{type}</Type>
      </NameAndType>
      {description && (
        <StyledDescription>
          <Markdown content={description} />
        </StyledDescription>
      )}
    </ListItemStyled>
  );
};
