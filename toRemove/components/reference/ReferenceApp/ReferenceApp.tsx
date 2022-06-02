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
import { useGraphiQL, useResults } from '@hooks';

/** styles */
import { ReferenceAppStyled } from './styles';

export const ReferenceApp = () => {
  const { schema } = useGraphiQL();
  const { results, setResults } = useResults();

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
          initialWidthPercent: 40,
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
          initialWidthPercent: 60,
        }}
      />
    </ReferenceAppStyled>
  );
};
