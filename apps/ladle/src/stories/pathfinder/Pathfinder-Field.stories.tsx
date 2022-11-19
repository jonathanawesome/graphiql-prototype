// components
import { Field } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder';

// hooks
import { useTestSchema } from '@graphiql-prototype/store';

export const FieldStory = () => {
  const { getQueryField } = useTestSchema();
  const testField = getQueryField('test');

  return (
    <Field
      ancestors={[
        {
          type: 'FIELD',
          field: testField,
          selection: null,
        },
      ]}
    />
  );
};
