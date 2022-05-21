/** component */
import { EditorGroup } from './EditorGroup';

/** constants */
import { defaultResults } from '@/constants';

/** hooks */
import { useGraphiQL, useResults } from '@/hooks';

export const Story = () => {
  const { schema } = useGraphiQL();
  const { results, setResults } = useResults();

  if (!schema) {
    return <p>loading schema...</p>;
  }

  return (
    <EditorGroup
      defaultResults={defaultResults}
      results={results}
      schema={schema}
      setResults={setResults}
    />
  );
};

Story.storyName = 'EditorGroup ';
