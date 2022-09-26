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
    <StyledTypeSummary>
      <StyledTertiaryTrigger
        color="BLUE"
        onClick={() =>
          setActiveTertiaryPane({
            destinationPane: type,
            reset: resetTertiaryPaneOnClick,
          })
        }
      >
        {type.name}
      </StyledTertiaryTrigger>
      {showDescription && type.description && (
        <Markdown content={type.description} showSummary={true} />
      )}
    </StyledTypeSummary>
  );
};
