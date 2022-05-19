/** components */
import { Field } from '@/components';

/** hooks */
import { useGraphiQL } from '@/hooks';
import { GraphQLField } from 'graphql';

export const FieldStory = () => {
  // const { operation } = useGraphiQL();
  const { onEditDefinition, operationDefinition, schema } = useGraphiQL();

  if (!schema) {
    return <p>loading...</p>;
  }

  const fields = schema.getQueryType()?.getFields();

  return (
    // <div style={{ display: 'grid', gridTemplateColumns: `1fr 200px`, height: `100%` }}>
    <Field
      field={fields && fields[3]}
      onEdit={() => null}
      selectionSet={operationDefinition?.selectionSet}
    />
    // </div>
  );
};

FieldStory.storyName = 'Field';
