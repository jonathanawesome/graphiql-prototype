import { useState } from 'react';

// components
import { SchemaDefinition } from './SchemaDefinition';
import { SchemaReference } from './SchemaReference';

// styles
import {
  StyledSchema,
  StyledSchemaNavigationButton,
  StyledSchemaNavigation,
} from './styles';

export const Schema = () => {
  const [activeSchemaView, setActiveSchemaView] = useState<'REFERENCE' | 'DEFINITION'>(
    'REFERENCE'
  );

  return (
    <StyledSchema>
      <StyledSchemaNavigation>
        <StyledSchemaNavigationButton
          isActive={activeSchemaView === 'REFERENCE'}
          onClick={() => setActiveSchemaView('REFERENCE')}
        >
          Schema Reference
        </StyledSchemaNavigationButton>
        <StyledSchemaNavigationButton
          isActive={activeSchemaView === 'DEFINITION'}
          onClick={() => setActiveSchemaView('DEFINITION')}
        >
          Schema Definition
        </StyledSchemaNavigationButton>
      </StyledSchemaNavigation>
      {activeSchemaView === 'REFERENCE' && <SchemaReference />}
      {activeSchemaView === 'DEFINITION' && <SchemaDefinition />}
    </StyledSchema>
  );
};
