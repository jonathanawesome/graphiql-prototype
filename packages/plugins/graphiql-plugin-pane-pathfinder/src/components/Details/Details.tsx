import { isRequiredArgument, isRequiredInputField } from 'graphql';

// components
import { Icon } from '@graphiql-prototype/ui-library';

// hooks
import { usePathfinder } from '../../hooks';
import { useSchemaReference } from '@graphiql-prototype/graphiql-plugin-schema-documentation';

// styles
import { DetailsStyled, NameAndType, Name, Type } from './styles';

// types
import type { ListItemTypeTypes, ListItemVariants } from '../ListItem';

export type DetailsProps = {
  isSelected: boolean;
  type: ListItemTypeTypes;
  variant: ListItemVariants;
};

export const Details = ({ isSelected, type, variant }: DetailsProps) => {
  const { descriptionsVisibility } = usePathfinder();

  // console.log('Details', { type, variant });

  const { setActiveTertiaryPane } = useSchemaReference();

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
          {variant === 'INLINE_FRAGMENT'
            ? `... on ${type.name}`
            : `${type.name}${asterisk || ''}`}
        </Name>
        {variant !== 'INPUT_OBJECT' && (
          <Type>
            <button
              onClick={() => {
                setActiveTertiaryPane({ destinationPane: type });
              }}
            >
              <Icon name="Docs" />
            </button>
          </Type>
        )}
      </NameAndType>
    </DetailsStyled>
  );
};
