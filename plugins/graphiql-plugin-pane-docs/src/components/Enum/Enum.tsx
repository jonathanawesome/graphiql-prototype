import { GraphQLEnumType } from 'graphql';

// components
import { Description } from '../Description';
import { ListItem } from '../ListItem';
import { List } from '../List';
import { Separator } from '../Separator';

export const Enum = ({ type }: { type: GraphQLEnumType }) => {
  const values = type.getValues();

  return (
    <>
      <Description
        copy={
          type.description && type.description.length > 0
            ? type.description
            : `No description`
        }
      />

      <Separator orientation={'horizontal'} />

      <List
        items={values.map((v) => (
          <ListItem
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
