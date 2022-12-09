import { GraphQLDirective, GraphQLNamedType } from 'graphql';

// components
import { Markdown } from '@graphiql-prototype/ui-library';

// hooks
import { useSchemaReference } from '../../hooks';

// styles
import { StyledTypeSummary, StyledTertiaryTrigger } from '../styles';

export const TypeSummary = ({
  resetTertiaryPaneOnClick,
  showDescription,
  type,
}: {
  resetTertiaryPaneOnClick: boolean;
  showDescription: boolean;
  type: GraphQLNamedType | GraphQLDirective;
}) => {
  // console.log('TypeSummary', { type });

  const { setActiveTertiaryPane } = useSchemaReference();

  return (
    <div className={StyledTypeSummary()}>
      <button
        className={StyledTertiaryTrigger({ color: 'BLUE' })}
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: type,
            reset: resetTertiaryPaneOnClick,
          })
        }
      >
        {type.name}
      </button>
      {showDescription && type.description && (
        <Markdown content={type.description} showSummary={true} />
      )}
    </div>
  );
};
