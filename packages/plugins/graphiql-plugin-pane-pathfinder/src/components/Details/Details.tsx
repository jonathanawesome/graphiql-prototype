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
import { StyledDetails } from './styles';

// types
import type { ListItemTypeTypes, ListItemVariants } from '../ListItem';

export type DetailsProps = {
  ancestors: AncestorsArray;
  isSelected: boolean;
  type: ListItemTypeTypes;
  variant: ListItemVariants;
};

export const Details = ({ ancestors, isSelected, type, variant }: DetailsProps) => {
  const [showControls, setShowControls] = useState<boolean>(false);
  const { setActiveTertiaryPane } = useSchemaReference();

  const previousAncestor = ancestors[ancestors.length - 2];

  const asterisk =
    'defaultValue' in type &&
    (isRequiredArgument(type) || isRequiredInputField(type)) &&
    `*`;

  return (
    <div
      className={StyledDetails({
        controlsVisible: showControls,
        entityType: variant,
        isSelected,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        className="details-name-and-controls"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <span className="details-name">
          {variant === 'INLINE_FRAGMENT'
            ? `... on ${type.name}`
            : `${type.name}${asterisk || ''}`}
        </span>
        {!['INPUT_OBJECT', 'INLINE_FRAGMENT'].includes(variant) && (
          <div className="details-controls">
            <Button
              action={() => setActiveTertiaryPane({ destinationPane: type })}
              icon="Docs"
              label="View Quick Docs"
              size="SMALL"
              style="ICON"
            />
            {previousAncestor.type === 'ROOT' && (
              <Button
                action={() => {
                  const fullModelRange = useEditor
                    .getState()
                    .getActiveTab()
                    ['operationsModel'].getFullModelRange();

                  const range = {
                    startLineNumber: fullModelRange.endLineNumber + 1,
                    startColumn: 0,
                    endLineNumber: fullModelRange.endLineNumber + 1,
                    endColumn: 0,
                  };

                  return insertNewOperation({
                    ancestors,
                    range,
                  });
                }}
                icon="InsertNewOperation"
                label="Insert field with new operation"
                size="SMALL"
                style="ICON"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
