import { GraphQLFieldMap } from 'graphql';

// components
import { FieldSummary } from '../summary/FieldSummary';
import { PaneSection } from './PaneSection';

export const FieldsPaneSection = ({
  fields,
  resetTertiaryPaneOnClick,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any>;
  resetTertiaryPaneOnClick: boolean;
}) => {
  return (
    <>
      {Object.keys(fields).length > 0 ? (
        <PaneSection lead="Fields">
          {Object.keys(fields)
            .sort()
            .map((f) => (
              <FieldSummary
                key={fields[f].name}
                field={fields[f]}
                resetTertiaryPaneOnClick={resetTertiaryPaneOnClick}
              />
            ))}
        </PaneSection>
      ) : null}
    </>
  );
};
