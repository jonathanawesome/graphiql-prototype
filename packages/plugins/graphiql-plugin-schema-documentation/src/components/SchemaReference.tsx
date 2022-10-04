import { useEffect } from 'react';

// components
import { PaneSection } from './PaneSection/PaneSection';
import { RootOperationTypesNav } from './RootOperationTypesNav';
import { SecondaryPane } from './SecondaryPane';
import { TabButton } from './TabButton';
import { Tag } from '@graphiql-prototype/ui-library';
import { TertiaryPane } from './tertiary/TertiaryPane';
import { TypesNav } from './TypesNav';

// hooks
import { useSchema } from '@graphiql-prototype/use-schema';
import { useSchemaReference } from '../hooks';

// styles
import {
  StyledBreadcrumb,
  StyledBreadcrumbArrow,
  StyledBreadcrumbItem,
  StyledPanes,
  StyledPrimaryPane,
  StyledSchemaReference,
} from './styles';

// utils
import { sortTypes } from './utils';

export const SchemaReference = () => {
  const { schema, schemaUrl } = useSchema();

  const {
    activePrimaryPane,
    activeTertiaryPane,
    clearTertiaryPaneStack,
    setActivePrimaryPane,
    tertiaryPaneStack,
  } = useSchemaReference();

  useEffect(() => {
    // pseudo-reset when the schemaUrl changes
    setActivePrimaryPane({ destinationPane: 'Query' });
    clearTertiaryPaneStack();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemaUrl]);

  if (!schema || 'error' in schema) {
    return <p>error</p>;
  }

  const typeMap = schema?.getTypeMap();
  const sortedTypes = sortTypes({ typeMap });
  const queryRootType = schema?.getQueryType();
  const mutationRootType = schema?.getMutationType();
  const subscriptionRootType = schema?.getSubscriptionType();
  const directives = schema?.getDirectives();

  console.log('SchemaReference', { schema });

  return (
    <StyledSchemaReference>
      <StyledBreadcrumb>
        <span>Schema</span>
        <StyledBreadcrumbArrow>{`->`}</StyledBreadcrumbArrow>
        <span>{activePrimaryPane}</span>
        {tertiaryPaneStack.length > 0 &&
          tertiaryPaneStack.map((stackItem) => (
            <StyledBreadcrumbItem key={stackItem.hash}>
              <StyledBreadcrumbArrow>{`->`}</StyledBreadcrumbArrow>
              {stackItem.pane.name}
            </StyledBreadcrumbItem>
          ))}
      </StyledBreadcrumb>
      <StyledPanes>
        <StyledPrimaryPane>
          <PaneSection lead={`Schema description`} withSidePadding={true}>
            {schema.description || 'No description provided'}
          </PaneSection>
          <RootOperationTypesNav
            queryRootType={queryRootType || null}
            mutationRootType={mutationRootType || null}
            subscriptionRootType={subscriptionRootType || null}
          />
          <TypesNav sortedTypes={sortedTypes} />
          <PaneSection lead={`Other`} withSidePadding={false}>
            <TabButton
              destinationPane="Directives"
              copy={
                <div style={{ display: 'flex', gap: 12 }}>
                  Directives
                  <Tag
                    copy={directives.length.toString() as string}
                    title={`Directives count`}
                    type="OPERATION"
                  />
                </div>
              }
            />
          </PaneSection>
        </StyledPrimaryPane>
        <SecondaryPane
          directives={directives}
          queryRootType={queryRootType || null}
          mutationRootType={mutationRootType || null}
          subscriptionRootType={subscriptionRootType || null}
          sortedTypes={sortedTypes}
        />
        {activeTertiaryPane && <TertiaryPane pane={activeTertiaryPane['pane']} />}
      </StyledPanes>
    </StyledSchemaReference>
  );
};
