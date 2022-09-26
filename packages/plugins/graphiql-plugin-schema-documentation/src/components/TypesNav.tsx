// components
import { PaneSection } from './PaneSection/PaneSection';
import { TabButton } from './TabButton';
import { Tag } from '@graphiql-prototype/ui-library';

// types
import { SortedTypeMap, TopLevelPane } from '../hooks';

export const TypesNav = ({ sortedTypes }: { sortedTypes: SortedTypeMap }) => {
  // console.log('TypesNav', {
  //   sortedTypes,
  // });

  return (
    <PaneSection lead={`Types`} withSidePadding={false}>
      {Object.keys(sortedTypes).map((s) => {
        return (
          <TabButton
            key={s}
            destinationPane={s as TopLevelPane}
            copy={
              <div style={{ display: 'flex', gap: 12 }}>
                {s}
                <Tag copy={sortedTypes[s].length} title={s} type="OPERATION" />
              </div>
            }
          />
        );
      })}
    </PaneSection>
  );
};
