import { useEffect, useState } from 'react';

// components
import { Details } from '../Details';
import { DeprecatedMessage } from '../DeprecatedMessage';
import { Button, SeparatorRound } from '@graphiql-prototype/ui-library';

// styles
import {
  // StyledChildFields,
  StyledCollapsibleListItemTriggerWrap,
  // StyledLeafIndicator,
  StyledListItem,
  // StyledListItemContent,
  // StyledListItemLeadWrap,
} from './styles';

// types
import { Toggler } from '../Toggler';

// types
import { ListItemProps } from './types';

export const ListItem = ({
  ancestors,
  collapsibleContent,
  isSelected,
  toggler,
  type,
  variant,
}: ListItemProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // console.log('ListItem', {
  //   type: type.name,
  //   isSelected,
  //   variant,
  // });

  useEffect(() => {
    // this effect ensures the field is initially expanded when selected
    // this is one of the many micro-interactions in pathfinder that need tweaking/testing
    if (isSelected) {
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }, [isSelected]);

  if (collapsibleContent) {
    const id = `${type.name}-${variant}`;
    return (
      <li className={StyledListItem({ isExpanded, variant })}>
        <div className="listItem-lead-wrap">
          <div className={StyledCollapsibleListItemTriggerWrap({ isExpanded, variant })}>
            <Button
              action={() => setIsExpanded(!isExpanded)}
              controls={id}
              expanded={isExpanded}
              icon="Caret"
              label={`Expand nested content of ${type.name} ${variant}`}
              size="SMALL"
              style="ICON"
            />
          </div>

          {toggler && (
            <Toggler
              {...toggler}
              collapser={{
                isOpen: isExpanded,
                setIsOpen: setIsExpanded,
              }}
            />
          )}
          <Details
            ancestors={ancestors}
            isSelected={isSelected}
            type={type}
            variant={variant}
          />
        </div>
        <div className="listItem-content" id={id}>
          {isExpanded && (
            <>
              {'deprecationReason' in type && type.deprecationReason && (
                <DeprecatedMessage deprecationReason={type.deprecationReason} />
              )}

              {collapsibleContent.arguments && collapsibleContent.arguments}
              {isExpanded && collapsibleContent.childFields && (
                <ul className="child-fields">{collapsibleContent.childFields}</ul>
              )}
            </>
          )}
        </div>
      </li>
    );
  }

  return (
    <li className={StyledListItem()}>
      <div className="listItem-lead-wrap">
        <div className="leaf-indicator">
          <SeparatorRound />
        </div>
        {toggler && <Toggler {...toggler} />}
        <Details
          ancestors={ancestors}
          isSelected={isSelected}
          type={type}
          variant={variant}
        />
      </div>
    </li>
  );
};
