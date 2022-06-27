import { GraphQLFieldMap, GraphQLInterfaceType, GraphQLObjectType } from 'graphql';
import { useState, useEffect } from 'react';

// components
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';
import { DescriptionList } from '../DescriptionList';
import { DocsDescription } from '../DocsDescription';
import { Fields } from '../Fields';
import { Separator } from '../Separator';

// hooks
import { DocPlacement, useDocs } from '../../hooks';
import { useGraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';

export const Interface = ({
  placement,
  type,
}: {
  placement: DocPlacement;
  type: GraphQLInterfaceType;
}) => {
  const { navigateForward } = useDocs();

  const { schema } = useGraphiQLEditor();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fields, setFields] = useState<GraphQLFieldMap<any, any> | null>(null);
  const [implementingObjects, setImplementingObjects] =
    useState<ReadonlyArray<GraphQLObjectType> | null>(null);

  useEffect(() => {
    if (schema && !('error' in schema)) {
      const implementations = schema.getImplementations(type);
      setImplementingObjects(implementations.objects);
    }
    setFields(type.getFields());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  console.log('InterfaceType', {
    type,
    fields,
    implementingObjects,
  });

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

      {fields && <Fields fields={fields} placement={placement} />}

      <Separator orientation={'horizontal'} />

      {implementingObjects && (
        <DescriptionList
          items={Object.keys(implementingObjects)
            .sort()
            .map((object) => (
              <DescriptionListItem
                key={implementingObjects[object].name}
                description={implementingObjects[object].description || null}
                name={implementingObjects[object].name}
                type={
                  <button
                    onClick={() => {
                      navigateForward({
                        docPane: {
                          description: implementingObjects[object].description || null,
                          name: implementingObjects[object].name,
                          type: implementingObjects[object],
                        },
                        placement,
                      });
                    }}
                  >
                    {implementingObjects[object].toString()}
                  </button>
                }
              />
            ))}
          title="Implementations"
        />
      )}
    </>
  );
};
