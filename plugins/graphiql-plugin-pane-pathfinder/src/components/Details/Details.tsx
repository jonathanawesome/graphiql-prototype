import { isRequiredArgument, isRequiredInputField } from 'graphql';

// components
import { SeparatorRound } from '@graphiql-v2-prototype/graphiql-ui-library';

// hooks
import { usePathfinder } from '../../hooks';

// styles
import { Description, DetailsStyled, NameAndType, Name, Type } from './styles';

// types
import { ListItemTypeTypes, ListItemVariants } from '../ListItem';

export type DetailsProps = {
  isSelected: boolean;
  type: ListItemTypeTypes;
  variant: ListItemVariants;
};

export const Details = ({ isSelected, type, variant }: DetailsProps) => {
  const { descriptionsVisibility } = usePathfinder();

  // console.log('Details', { type, variant });

  const asterisk =
    'defaultValue' in type &&
    (isRequiredArgument(type) || isRequiredInputField(type)) &&
    `*`;

  return (
    <DetailsStyled
      descriptionPlacement={descriptionsVisibility}
      entityType={variant}
      isSelected={isSelected}
    >
      <NameAndType>
        {/* 👇 this fragment situation is weird...just a guess I took given that union types and fragment handling isn't in the design. needs to be resolved at the community/design level  */}
        <Name>
          {variant === 'INLINE_FRAGMENT' ? `... on` : `${type.name}${asterisk || ''}`}
        </Name>

        {variant !== 'ROOT' && (
          <Type>{'type' in type ? type.type.toString() : type.toString()}</Type>
        )}
      </NameAndType>
      {variant !== 'ROOT' && type.description && (
        <Description>
          <SeparatorRound />
          <span>{type.description}</span>
        </Description>
      )}
    </DetailsStyled>
  );
};
