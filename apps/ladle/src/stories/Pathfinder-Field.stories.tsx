// components
import { Field } from '@graphiql-prototype/graphiql-plugin-pane-pathfinder';

// hooks
import { useTestSchema } from '@graphiql-prototype/store';
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
