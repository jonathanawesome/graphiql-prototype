/** components */
import {
  EditorGroup,
  Explorer,
  HorizontallyResizableContainer,
  Navigation,
} from '@/components';

/** constants */
import { defaultResults } from '@/constants';

/** hooks */
import { useGraphiQL } from '@/hooks';

/** styles */
import { ReferenceAppStyled } from './styles';

export const ReferenceApp = () => {
  const { results, schema, setResults } = useGraphiQL();

  if (!schema) {
    return <p>loading schema...</p>;
  }

  return (
    <ReferenceAppStyled>
      <HorizontallyResizableContainer
        leftPane={{
          component: (
            <>
              <Navigation />
              <Explorer />
            </>
          ),
          initialWidthPercent: 30,
        }}
        rightPane={{
          component: (
            <EditorGroup
              defaultResults={defaultResults}
              results={results}
              schema={schema}
              setResults={setResults}
            />
          ),
          initialWidthPercent: 70,
        }}
      />
    </ReferenceAppStyled>
  );
};
