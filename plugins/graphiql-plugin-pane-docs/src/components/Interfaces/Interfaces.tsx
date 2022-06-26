import { GraphQLInterfaceType } from 'graphql';

// components
import { DescriptionListItem } from '@graphiql-v2-prototype/graphiql-ui-library';
import { DescriptionList } from '../DescriptionList';

// hooks
import { useDocs } from '../../hooks';

type InterfacesProps = {
  interfaces: ReadonlyArray<GraphQLInterfaceType>;
};

export const Interfaces = ({ interfaces }: InterfacesProps) => {
  const { currentType, previousTypes, setCurrentType, setPreviousTypes } = useDocs();

  return (
    <DescriptionList
      items={interfaces.map((int) => (
        <DescriptionListItem
          description={int.description || null}
          name={int.name}
          type={
            <button
              onClick={() => {
                setCurrentType({
                  currentType: int,
                });
                setPreviousTypes({
                  previousTypes: currentType ? [...previousTypes, currentType] : [],
                });
              }}
            >
              {int.toString()}
            </button>
          }
        />
      ))}
      title="Interfaces"
    />
  );
};
