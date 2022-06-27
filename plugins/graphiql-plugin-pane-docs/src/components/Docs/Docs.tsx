import { useEffect } from 'react';

// components
import { DocsLead } from '../DocsLead';
import { DocsPanel } from '../DocsPanel';

// hooks
import { DocPlacement, useDocs } from '../../hooks';
import { useGraphiQLEditor } from '@graphiql-v2-prototype/graphiql-editor';

// styles
import { DocsStyled } from './styles';

export const Docs = ({ placement = 'EXPLORER' }: { placement: DocPlacement }) => {
  const { getDocsInstance, initDocsInstance } = useDocs();

  const { schema } = useGraphiQLEditor();

  const docsInstanceExplorer = getDocsInstance({ placement: 'EXPLORER' });
  const docsInstancePathfinder = getDocsInstance({ placement: 'PATHFINDER' });

  // console.log('Docs', {
  //   schema,
  //   docsInstanceExplorer,
  //   docsInstancePathfinder,
  // });

  useEffect(() => {
    if (schema && !('error' in schema)) {
      //schema is valid

      if (!docsInstanceExplorer) {
        // we haven't initialized the Explorer instance, let's do it now
        return initDocsInstance({
          docPane: {
            description: schema.description || null,
            name: 'Schema',
            type: schema,
          },
          placement: 'EXPLORER',
        });
      }

      if (!docsInstancePathfinder) {
        // we haven't initialized the Pathfinder instance, let's do it now
        return initDocsInstance({
          placement: 'PATHFINDER',
        });
      }
    }

    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (schema && !('error' in schema)) {
      //schema is valid

      if (
        docsInstanceExplorer?.docPanes &&
        schema !== docsInstanceExplorer?.docPanes[0].type
      ) {
        // docsInstanceExplorer holds the current schema as it's first item
        // re-initialize docs and pathfinder instances if the schema has changed
        initDocsInstance({
          docPane: {
            description: schema.description || null,
            name: 'Schema',
            type: schema,
          },
          placement: 'EXPLORER',
        });
        initDocsInstance({
          placement: 'PATHFINDER',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

  return (
    <DocsStyled>
      <DocsLead placement={placement} />
      <DocsPanel placement={placement} />
    </DocsStyled>
  );
};
