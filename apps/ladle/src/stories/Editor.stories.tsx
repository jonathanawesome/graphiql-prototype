import { useEffect } from 'react';

// component
import { GraphiQLEditor } from '@graphiql-prototype/editor';

// hooks
import { useSchema } from '@graphiql-prototype/use-schema';

export const GraphiQLEditorStory = () => {
  const { loadSchema } = useSchema();

  useEffect(() => {
    loadSchema({ init: true, url: 'GraphiQL Test Schema' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <GraphiQLEditor />;
};

GraphiQLEditorStory.storyName = 'GraphiQLEditor';
