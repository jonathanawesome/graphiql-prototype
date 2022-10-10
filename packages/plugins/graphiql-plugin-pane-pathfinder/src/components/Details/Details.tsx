import { isRequiredArgument, isRequiredInputField } from 'graphql';

// components
import { Icon } from '@graphiql-prototype/ui-library';

// hooks
import { useSchemaReference } from '@graphiql-prototype/graphiql-plugin-schema-documentation';

// styles
import { StyledDetails, NameAndType, Name, Type } from './styles';

// types
import type { ListItemTypeTypes, ListItemVariants } from '../ListItem';
import { useState } from 'react';

export type DetailsProps = {
  isSelected: boolean;
  type: ListItemTypeTypes;
  variant: ListItemVariants;
};

export const Details = ({ isSelected, type, variant }: DetailsProps) => {
  // console.log('Details', { type, variant });
  const [showControls, setShowControls] = useState<boolean>(false);
  const { setActiveTertiaryPane } = useSchemaReference();

  const asterisk =
    'defaultValue' in type &&
    (isRequiredArgument(type) || isRequiredInputField(type)) &&
    `*`;

  return (
    <StyledDetails entityType={variant} isSelected={isSelected}>
      <NameAndType
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <Name>
          {variant === 'INLINE_FRAGMENT'
            ? `... on ${type.name}`
            : `${type.name}${asterisk || ''}`}
        </Name>
        {showControls && variant !== 'INPUT_OBJECT' && (
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
    </StyledDetails>
  );
};
