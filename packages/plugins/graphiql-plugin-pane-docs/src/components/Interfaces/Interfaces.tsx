import { GraphQLInterfaceType } from 'graphql';

// components
import { ListItem } from '../ListItem';
import { List } from '../List';

// hooks
import { DocPlacement, useDocs } from '../../hooks';

type InterfacesProps = {
  interfaces: ReadonlyArray<GraphQLInterfaceType>;
  placement: DocPlacement;
};

export const Interfaces = ({ interfaces, placement }: InterfacesProps) => {
  const { navigateForward } = useDocs();

  return (
    <List
      items={interfaces.map((int) => (
        <ListItem
          key={int.name}
          description={int.description || null}
          name={int.name}
          type={
            <button
              onClick={() => {
                navigateForward({
                  docPane: {
                    description: int.description || null,
                    name: int.name,
                    type: int,
                  },
                  placement,
                });
              }}
            >
              {int.toString()}
            </button>
          }
        />
      ))}
      title="Implements"
    />
  );
};
