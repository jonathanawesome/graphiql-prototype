// components
import { ListItem } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';

// hooks
import { useTestSchema } from '@graphiql-v2-prototype/graphiql-test-schema';

export const Field = () => {
  const { queryType } = useTestSchema();
  const fields = queryType.getFields();
  return Object.keys(fields).map((key) => {
    return (
      <ListItem
        key={fields[key].name}
        // collapser={{c}}
        isSelected={true}
        // toggler={}
        type={fields[key]}
        variant="FIELD"
      />
    );
  });
};
