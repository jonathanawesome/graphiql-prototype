import { GraphQLDirective, GraphQLNamedType } from 'graphql';

// components
import { PaneSection } from './PaneSection/PaneSection';
import { TypeSummary } from './summary/TypeSummary';

export const TypePane = ({
  list,
  name,
  showDescription = true,
}: {
  list: GraphQLNamedType[] | readonly GraphQLDirective[];
  name: string;
  showDescription?: boolean;
}) => {
  // console.log('TypePane', { list });

  return (
    <>
      <PaneSection lead={name}>
        {list.map((x: GraphQLNamedType | GraphQLDirective) => (
          <TypeSummary
            key={x.name}
            resetTertiaryPaneOnClick={true}
            showDescription={showDescription}
            type={x}
          />
        ))}
      </PaneSection>
    </>
  );
};
