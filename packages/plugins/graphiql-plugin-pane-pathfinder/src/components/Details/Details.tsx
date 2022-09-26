import { isRequiredArgument, isRequiredInputField, isScalarType } from 'graphql';

// components
import { Icon, SeparatorRound } from '@graphiql-prototype/ui-library';

// hooks
import { usePathfinder } from '../../hooks';
// import { useDocs } from '@graphiql-prototype/graphiql-plugin-pane-docs';

// styles
import { Description, DetailsStyled, NameAndType, Name, Type } from './styles';

// types
import type { ListItemTypeTypes, ListItemVariants } from '../ListItem';

// utils
import { unwrapType } from '../../utils';
import { Field } from '../Field';
import { useSchemaReference } from '@graphiql-prototype/graphiql-plugin-schema-documentation';

export type DetailsProps = {
  isSelected: boolean;
  type: ListItemTypeTypes;
  variant: ListItemVariants;
};

export const Details = ({ isSelected, type, variant }: DetailsProps) => {
  const { descriptionsVisibility } = usePathfinder();
  // const { navigateForward } = useDocs();

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
                // navigateForward({
                //   docPane: {
                //     description: type.description || null,
                //     name: type.name,
                //     type,
                //     // type: 'type' in type ? unwrapType(type.type) : unwrapType(type),
                //   },
                //   placement: 'PATHFINDER',
                // });
              }}
            >
              <Icon name="Docs" />
              {/* {'type' in type ? type.type.toString() : type.toString()} */}
            </button>
          </Type>
        )}
      </NameAndType>
      {/* {variant !== 'ROOT' && type.description && (
        <Description>
          <SeparatorRound />
          <span>{type.description}</span>
        </Description>
      )} */}
    </DetailsStyled>
  );
};
