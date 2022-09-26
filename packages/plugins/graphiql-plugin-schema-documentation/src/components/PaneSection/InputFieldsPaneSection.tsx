import { GraphQLInputFieldMap } from 'graphql';

// components
import { InputFieldSummary } from '../summary/InputFieldSummary';
import { PaneSection } from './PaneSection';

export const InputFieldsPaneSection = ({ fields }: { fields: GraphQLInputFieldMap }) => {
  return (
    <>
      {Object.keys(fields).length > 0 ? (
        <PaneSection lead="Input Fields">
          {Object.keys(fields)
            .sort()
            .map((f) => (
              <InputFieldSummary key={fields[f].name} inputField={fields[f]} />
            ))}
        </PaneSection>
      ) : null}
    </>
  );
};
