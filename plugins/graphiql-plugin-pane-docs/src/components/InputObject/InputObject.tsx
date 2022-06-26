import { useEffect, useState } from 'react';
import { GraphQLInputFieldMap, GraphQLInputObjectType } from 'graphql';

// components
import { DocsDescription } from '../DocsDescription';
import { Fields } from '../Fields';
import { Separator } from '../Separator';

export const InputObject = ({ type }: { type: GraphQLInputObjectType }) => {
  const [fields, setFields] = useState<GraphQLInputFieldMap | null>(null);

  // console.log('InputObject', { type });

  useEffect(() => {
    setFields(type.getFields());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <>
      <DocsDescription
        copy={
          type.description && type.description.length > 0
            ? type.description
            : `No description`
        }
      />

      <Separator orientation={'horizontal'} />

      {fields && <Fields fields={fields} />}
    </>
  );
};
