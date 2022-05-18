/** component */
import { EditorGroup } from './EditorGroup';

/** constants */
import { defaultResults } from '@/constants';

/** hooks */
import { useGraphiQL } from '@/hooks';

export const Story = () => {
  const { results, schema, setResults } = useGraphiQL();

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
