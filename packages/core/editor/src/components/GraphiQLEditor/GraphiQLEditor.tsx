import { useState } from 'react';

// components
import { Analyze } from '../Analyze/Analyze';
import { ConnectionSettings } from '../ConnectionSettings';
import { EditorTabs } from '../EditorTabs';
import { Operate } from '../Operate';
import { Resizer } from '@graphiql-prototype/ui-library';
import { SchemaReference } from '../SchemaReference';

// hooks
import { useEditorPanes } from '../../hooks';

// styles
import { EditorWrap, EditorInner } from './styles';
import { Workspace } from '../Workspace';

export const GraphiQLEditor = () => {
  const { activePane } = useEditorPanes();

  return (
    <EditorWrap>
      <EditorInner>
        <ConnectionSettings />
        {activePane === 'WORKSPACE' && <Workspace />}
        {activePane === 'SCHEMA_REFERENCE' && <SchemaReference />}
      </EditorInner>
    </EditorWrap>
  );
};
