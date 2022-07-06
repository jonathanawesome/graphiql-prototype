import { isRequiredArgument, isRequiredInputField } from 'graphql';

// components
import { SeparatorRound } from '@graphiql-v2-prototype/graphiql-ui-library';

// hooks
import { usePathfinder } from '../../hooks';
import { useDocs } from '@graphiql-v2-prototype/graphiql-plugin-pane-docs';

// styles
import { Description, DetailsStyled, NameAndType, Name, Type } from './styles';

// types
import type { ListItemTypeTypes, ListItemVariants } from '../ListItem';

// utils
import { unwrapType } from '../../utils';

export type DetailsProps = {
  isSelected: boolean;
  type: ListItemTypeTypes;
  variant: ListItemVariants;
};

export const Details = ({ isSelected, type, variant }: DetailsProps) => {
  const { descriptionsVisibility } = usePathfinder();
  const { navigateForward } = useDocs();

  // console.log('Details', { type, variant, unwrapType: unwrapType(type) });

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
          <>
            {/* <Type>{'type' in type ? type.type.toString() : type.toString()}</Type> */}
            <Type>
              <button
                onClick={() => {
                  navigateForward({
                    docPane: {
                      description: type.description || null,
                      name:
                        'type' in type
                          ? unwrapType(type.type).toString()
                          : unwrapType(type).toString(),
                      type: 'type' in type ? unwrapType(type.type) : unwrapType(type),
                    },
                    placement: 'PATHFINDER',
                  });
                }}
              >
                {'type' in type ? type.type.toString() : type.toString()}
              </button>
            </Type>
          </>
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

// field
{
  /* <button
onClick={() => {
  navigateForward({
    docPane: {
      description: field.description || null,
      // name: field.type.toString(),
      name: unwrapType(field.type).toString(),
      type: field.type,
    },
    placement: 'PATHFINDER',
  });
}}
>
{field.type.toString()}
</button> */
}

// inputObject
{
  /* <button
onClick={() => {
  navigateForward({
    docPane: {
      description: inputObjectType.description || null,
      name: unwrapType(inputObjectType).toString(),
      type: inputObjectType,
    },
    placement: 'PATHFINDER',
  });
}}
>
{inputObjectType.toString()}
</button> */
}

//scalarArg
{
  /* <button
onClick={() => {
  navigateForward({
    docPane: {
      description: argument.description || null,
      name: unwrapType(argument.type).toString(),
      type: argument.type,
    },
    placement: 'PATHFINDER',
  });
}}
>
{argument.type.toString()}
</button> */
}

// unionMember
{
  /* <button
onClick={() => {
  navigateForward({
    docPane: {
      description: objectMember.description || null,
      name: unwrapType(objectMember).toString(),
      type: objectMember,
    },
    placement: 'PATHFINDER',
  });
}}
>
{objectMember.toString()}
</button> */
}
