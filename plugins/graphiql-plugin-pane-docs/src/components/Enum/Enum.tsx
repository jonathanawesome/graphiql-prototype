import { GraphQLEnumType } from 'graphql';

// components
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';
import { DescriptionList } from '../DescriptionList';
import { DocsDescription } from '../DocsDescription';
import { Separator } from '../Separator';

export const Enum = ({ type }: { type: GraphQLEnumType }) => {
  const values = type.getValues();

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

      <DescriptionList
        items={values.map((v) => (
          <DescriptionListItem
            key={v.name}
            description={v.description || null}
            name={v.name}
            type={'enum'}
          />
        ))}
        title="Values"
      />
    </>
  );
};
