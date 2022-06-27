import { useEffect, useState } from 'react';
import { GraphQLFieldMap, GraphQLInterfaceType, GraphQLObjectType } from 'graphql';

// components
import { DocsDescription } from '../DocsDescription';
import { Separator } from '../Separator';

// hooks
import { Fields } from '../Fields';
import { Interfaces } from '../Interfaces';

// types
import type { DocPlacement } from '../../hooks';

export const ObjectType = ({
  placement,
  type,
}: {
  placement: DocPlacement;
  type: GraphQLObjectType;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fields, setFields] = useState<GraphQLFieldMap<any, any> | null>(null);
  const [interfaces, setInterfaces] =
    useState<ReadonlyArray<GraphQLInterfaceType> | null>(null);

  console.log('ObjectType', { type });

  useEffect(() => {
    setInterfaces(type.getInterfaces());
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

      {interfaces && interfaces.length > 0 && (
        <>
          <Separator orientation={'horizontal'} />
          <Interfaces interfaces={interfaces} placement={placement} />
        </>
      )}

      {fields && (
        <>
          <Separator orientation={'horizontal'} />
          <Fields fields={fields} placement={placement} />
        </>
      )}
    </>
  );
};
