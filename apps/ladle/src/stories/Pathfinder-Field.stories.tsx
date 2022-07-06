// components
import { Field } from '@graphiql-v2-prototype/graphiql-plugin-pane-pathfinder';

// hooks
import { useTestSchema } from '@graphiql-v2-prototype/graphiql-test-schema';
import { OperationTypeNode } from 'graphql';

export const FieldStory = () => {
  const { getQueryField } = useTestSchema();
  const testField = getQueryField('test');

  return (
    <Field
      ancestors={
        new Map([
          [
            `${testField.name}`,
            {
              field: testField,
              selectionSet: undefined,
              selection: null,
            },
          ],
        ])
      }
      operationType={OperationTypeNode.QUERY}
    />
  );
};
