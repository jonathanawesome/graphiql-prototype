import { GraphQLInterfaceType } from 'graphql';

// components
import { PaneSection } from './PaneSection';
import { TypeSummary } from '../summary/TypeSummary';

export const InterfacePaneSection = ({
  interfaces,
}: {
  interfaces: readonly GraphQLInterfaceType[];
}) => {
  return (
    <>
      {Object.keys(interfaces).length > 0 ? (
        <PaneSection lead="Implements">
          {Object.keys(interfaces)
            .sort()
            .map((f) => (
              <TypeSummary
                key={interfaces[f].name}
                resetTertiaryPaneOnClick={false}
                showDescription={true}
                type={interfaces[f]}
              />
            ))}
        </PaneSection>
      ) : null}
    </>
  );
};
