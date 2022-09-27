import { GraphQLObjectType } from 'graphql';

// components
import { PaneSection } from './PaneSection';
import { TypeSummary } from '../summary/TypeSummary';

export const PossibleTypesPaneSection = ({
  possibleTypes,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  possibleTypes: readonly GraphQLObjectType<any, any>[];
}) => {
  return (
    <>
      {possibleTypes.length > 0 ? (
        <PaneSection lead="Possible types">
          {possibleTypes.map((f) => (
            <TypeSummary
              key={f.name}
              resetTertiaryPaneOnClick={false}
              showDescription={true}
              type={f}
            />
          ))}
        </PaneSection>
      ) : null}
    </>
  );
};
