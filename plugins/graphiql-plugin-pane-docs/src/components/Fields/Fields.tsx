import { GraphQLFieldMap, GraphQLInputFieldMap } from 'graphql';

// components
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';
import { DescriptionList } from '../DescriptionList';

// hooks
import { useDocs } from '../../hooks';

type FieldsProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: GraphQLFieldMap<any, any> | GraphQLInputFieldMap;
};

export const Fields = ({ fields }: FieldsProps) => {
  const { currentType, previousTypes, setCurrentType, setPreviousTypes } = useDocs();

  return (
    <DescriptionList
      items={Object.keys(fields)
        .sort()
        .map((field) => (
          <DescriptionListItem
            description={fields[field].description || null}
            descriptionPlacement={'Below'}
            name={fields[field].name}
            type={
              <button
                onClick={() => {
                  setCurrentType({
                    currentType: fields[field].type,
                  });
                  setPreviousTypes({
                    previousTypes: currentType ? [...previousTypes, currentType] : [],
                  });
                }}
              >
                {fields[field].type.toString()}
              </button>
            }
          />
        ))}
      title="Fields"
    />
  );
};
