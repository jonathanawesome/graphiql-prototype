import { useState, useEffect } from 'react';
import { GraphQLObjectType, GraphQLUnionType } from 'graphql';

// components
import { DescriptionList } from '../DescriptionList';
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';
import { DocsDescription } from '../DocsDescription';
import { Separator } from '../Separator';

// hooks
import { useDocs } from '../../hooks';

export const Union = ({ type }: { type: GraphQLUnionType }) => {
  const { currentType, previousTypes, setCurrentType, setPreviousTypes } = useDocs();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [types, setTypes] = useState<ReadonlyArray<GraphQLObjectType<any, any>> | null>(
    null
  );

  console.log('Union', { type });

  useEffect(() => {
    setTypes(type.getTypes());
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

      {types && (
        <DescriptionList
          items={Object.keys(types)
            .sort()
            .map((type) => (
              <DescriptionListItem
                description={types[type].description || null}
                descriptionPlacement={'Below'}
                name={types[type].name}
                // type={types[type].type.toString()}
                type={
                  <button
                    onClick={() => {
                      setCurrentType({
                        currentType: types[type],
                      });
                      setPreviousTypes({
                        previousTypes: currentType ? [...previousTypes, currentType] : [],
                      });
                    }}
                  >
                    {types[type].toString()}
                  </button>
                }
              />
            ))}
          title="Possible Types"
        />
      )}
    </>
  );
};
