import { useState } from 'react';

// components
import { SchemaDefinition } from './SchemaDefinition';
import { SchemaReference } from './SchemaReference';

// hooks
import { SchemaReferenceProvider } from '../hooks';

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
    <div className={StyledSchema()}>
      <div className={StyledSchemaNavigation()}>
        <button
          className={StyledSchemaNavigationButton({
            isActive: activeSchemaView === 'REFERENCE',
          })}
          onClick={() => setActiveSchemaView('REFERENCE')}
        >
          Schema Reference
        </button>
        <button
          className={StyledSchemaNavigationButton({
            isActive: activeSchemaView === 'DEFINITION',
          })}
          onClick={() => setActiveSchemaView('DEFINITION')}
        >
          Schema Definition
        </button>
      </div>
      {activeSchemaView === 'REFERENCE' && (
        <SchemaReferenceProvider>
          <SchemaReference />
        </SchemaReferenceProvider>
      )}
      {activeSchemaView === 'DEFINITION' && <SchemaDefinition />}
    </div>
  );
};
