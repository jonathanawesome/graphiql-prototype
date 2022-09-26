import { GraphQLEnumType, GraphQLField } from 'graphql';

// components
import { Description } from '../Description';
import { ListItem } from '../ListItem';
import { List } from '../List';
import { Separator } from '../Separator';

export const Field = ({ field }: { field: GraphQLField<any, any, any> }) => {
  // const values = type.getValues();

  return (
    <>
      <Description
        copy={
          field.description && field.description.length > 0
            ? field.description
            : `No description`
        }
      />
      <p>FIELD FIELD IFEL</p>
      <Separator orientation={'horizontal'} />

      {/* <List
        items={values.map((v) => (
          <ListItem
            key={v.name}
            description={v.description || null}
            name={v.name}
            type={'enum'}
          />
        ))}
        title="Values"
      /> */}
    </>
  );
};
