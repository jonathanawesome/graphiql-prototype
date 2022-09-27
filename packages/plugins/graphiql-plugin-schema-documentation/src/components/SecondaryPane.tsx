import { ReactElement } from 'react';
import { GraphQLDirective, GraphQLObjectType } from 'graphql';

// components
import { RootOperationTypePane } from './RootOperationTypePane';
import { TypePane } from './TypePane';

// hooks
import { useSchemaReference } from '../hooks';

// styles
import { StyledSecondaryPane } from './styles';

// types
import { SortedTypeMap } from '../hooks';

export const SecondaryPane = ({
  directives,
  queryRootType,
  mutationRootType,
  subscriptionRootType,
  sortedTypes,
}: {
  directives: readonly GraphQLDirective[];
  queryRootType: GraphQLObjectType | null;
  mutationRootType: GraphQLObjectType | null;
  subscriptionRootType: GraphQLObjectType | null;
  sortedTypes: SortedTypeMap;
}) => {
  // console.log('SecondaryPane', {
  //   sortedTypes,
  // });

  const { activePrimaryPane, activeTertiaryPane } = useSchemaReference();

  let toRender: ReactElement = <></>;

  if (activePrimaryPane === 'Query' && queryRootType) {
    toRender = <RootOperationTypePane rootOperationType={queryRootType} />;
  }

  if (activePrimaryPane === 'Mutation' && mutationRootType) {
    toRender = <RootOperationTypePane rootOperationType={mutationRootType} />;
  }

  if (activePrimaryPane === 'Subscription' && subscriptionRootType) {
    toRender = <RootOperationTypePane rootOperationType={subscriptionRootType} />;
  }

  if (activePrimaryPane === 'Directives') {
    toRender = <TypePane list={directives} name={'Directives'} />;
  }

  if (activePrimaryPane === 'Enums') {
    toRender = <TypePane list={sortedTypes['Enums']} name={'Enums'} />;
  }

  if (activePrimaryPane === 'Input Objects') {
    toRender = <TypePane list={sortedTypes['Input Objects']} name={'Input Objects'} />;
  }

  if (activePrimaryPane === 'Objects') {
    toRender = <TypePane list={sortedTypes['Objects']} name={'Objects'} />;
  }

  if (activePrimaryPane === 'Scalars') {
    toRender = (
      <TypePane list={sortedTypes['Scalars']} name={'Scalars'} showDescription={false} />
    );
  }

  if (activePrimaryPane === 'Unions') {
    toRender = <TypePane list={sortedTypes['Unions']} name={'Unions'} />;
  }

  if (activePrimaryPane === 'Interfaces') {
    toRender = <TypePane list={sortedTypes['Interfaces']} name={'Interfaces'} />;
  }

  return (
    <StyledSecondaryPane activeTertiaryPane={activeTertiaryPane !== null}>
      {toRender}
    </StyledSecondaryPane>
  );
};
