import { useState } from 'react';
import { isRequiredArgument, isRequiredInputField } from 'graphql';

// components
import { Button } from '@graphiql-prototype/ui-library';

// hooks
import { useEditor } from '@graphiql-prototype/store';
import { useSchemaReference } from '@graphiql-prototype/graphiql-plugin-schema-documentation';
import { insertNewOperation } from '../../hooks';
import type { AncestorsArray } from '../../hooks';

// styles
import {
  StyledDetails,
  StyledNameAndControls,
  StyledName,
  StyledControls,
} from './styles';

// types
import type { ListItemTypeTypes, ListItemVariants } from '../ListItem';

export type DetailsProps = {
  ancestors: AncestorsArray;
  isSelected: boolean;
  type: ListItemTypeTypes;
  variant: ListItemVariants;
};

export const Details = ({ ancestors, isSelected, type, variant }: DetailsProps) => {
  // console.log('Details', { type, variant });
  const [showControls, setShowControls] = useState<boolean>(false);
  const { setActiveTertiaryPane } = useSchemaReference();

  const asterisk =
    'defaultValue' in type &&
    (isRequiredArgument(type) || isRequiredInputField(type)) &&
    `*`;

  return (
    <StyledDetails entityType={variant} isSelected={isSelected}>
      <StyledNameAndControls
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <StyledName>
          {variant === 'INLINE_FRAGMENT'
            ? `... on ${type.name}`
            : `${type.name}${asterisk || ''}`}
        </StyledName>
        {variant !== 'INPUT_OBJECT' && (
          <StyledControls isVisible={showControls}>
            {/* <button onClick={() => {}}>
              <Icon name="Docs" />
            </button> */}
            <Button
              action={() => setActiveTertiaryPane({ destinationPane: type })}
              icon="Docs"
              label="View Quick Docs"
              size="SMALL"
              style="ICON"
            />
            <Button
              action={() => {
                const fullModelRange = useEditor
                  .getState()
                  .getActiveTab()
                  ['operationsModel'].getFullModelRange();

                const range = {
                  startLineNumber: fullModelRange.endLineNumber + 1,
                  startColumn: 0 + 1,
                  endLineNumber: fullModelRange.endLineNumber + 1,
                  endColumn: 0 + 1,
                };

                return insertNewOperation({
                  ancestors,
                  range,
                });
              }}
              icon="Plus"
              label="Insert field with new operations"
              size="SMALL"
              style="ICON"
            />
          </StyledControls>
        )}
      </StyledNameAndControls>
    </StyledDetails>
  );
};
