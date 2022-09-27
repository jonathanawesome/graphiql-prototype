import { GraphQLEnumValue } from 'graphql';

// components
import { PaneSection } from './PaneSection';
import { Markdown } from '@graphiql-prototype/ui-library';

// styles
import { StyledEnumValue } from '../styles';

export const EnumValuesPaneSection = ({
  enumValues,
}: {
  enumValues: readonly GraphQLEnumValue[];
}) => {
  return (
    <>
      <PaneSection lead="Values">
        {enumValues.map((val) => (
          <StyledEnumValue key={val.name}>
            <div className={`enumValue`}>{val.name}</div>
            {val.description && (
              <Markdown content={val.description} showSummary={false} />
            )}
          </StyledEnumValue>
        ))}
      </PaneSection>
    </>
  );
};
