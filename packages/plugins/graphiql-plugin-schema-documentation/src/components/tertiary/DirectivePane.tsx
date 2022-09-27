import { GraphQLDirective } from 'graphql';
import { ArgumentsList } from '../ArgumentsList';

/// components
import { DescriptionPaneSection } from '../PaneSection/DescriptionPaneSection';
import { PaneSection } from '../PaneSection/PaneSection';

// styes
import { StyledDirectiveLocation } from '../styles';

export const DirectivePane = ({ directive }: { directive: GraphQLDirective }) => {
  // console.log('DirectivePane', { directive });
  return (
    <>
      <DescriptionPaneSection description={directive.description} />
      <PaneSection lead="Arguments">
        {directive.args.length > 0 ? (
          <ArgumentsList
            args={directive.args}
            resetTertiaryPaneOnClick={false}
            showDescription={true}
          />
        ) : (
          'This directive has no arguments'
        )}
      </PaneSection>
      <PaneSection lead="Locations">
        {directive.locations.map((d) => (
          <StyledDirectiveLocation key={d}>{d}</StyledDirectiveLocation>
        ))}
      </PaneSection>
    </>
  );
};
