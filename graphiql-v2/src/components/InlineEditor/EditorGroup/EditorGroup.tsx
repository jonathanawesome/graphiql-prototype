// import { useEffect } from 'react';
// import { initializeMode } from 'monaco-graphql/esm/initializeMode';

/** components */
import { Editor } from '../Editor';
import { EditorStack } from '../EditorStack';

/** constants */
import { defaultOperation, defaultVariables } from '../../../constants';

/** hooks */
import { useGraphiQL } from '../../../hooks';

/** layouts */
import { HorizontallyResizableContainer } from '../../../layouts';

/** styles */
import { EditorGroupInner, EditorGroupWrap, ResultsViewer } from './styles';

/** utils */
import { getOrCreateModel } from '../../../utils';

export const EditorGroup = ({
  defaultResults,
  tabName,
}: {
  defaultResults: string;
  tabName: string;
}) => {
  const {
    results,
    // schema,
    setResults,
  } = useGraphiQL();

  // create hashes for our 3 models here
  const opsUri = `${tabName}-operations.graphql`;
  const varsUri = `${tabName}-variables.json`;
  const resultsUri = `${tabName}-results.json`;

  const opsModel = getOrCreateModel({ uri: opsUri, value: defaultOperation });
  const varsModel = getOrCreateModel({ uri: varsUri, value: defaultVariables });
  const resultsModel = getOrCreateModel({ uri: resultsUri, value: defaultResults });

  // useEffect(() => {
  //   if (schema) {
  //     initializeMode({
  //       diagnosticSettings: {
  //         validateVariablesJSON: {
  //           [opsModel.uri.toString()]: [varsModel.uri.toString()],
  //         },
  //         jsonDiagnosticSettings: {
  //           validate: true,
  //           schemaValidation: 'error',
  //           allowComments: true,
  //           trailingCommas: 'ignore',
  //         },
  //       },
  //       // schemas: [
  //       //   {
  //       //     schema,
  //       //     uri: `${tabName}-schema.graphql`,
  //       //   },
  //       // ],
  //     });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [schema]);

  return (
    <EditorGroupWrap>
      <EditorGroupInner>
        {/* <Tabs /> */}
        <HorizontallyResizableContainer
          leftPane={{
            component: <EditorStack opsUri={opsUri} varsUri={varsUri} />,
            initialWidthPercent: 50,
          }}
          rightPane={{
            component: (
              <ResultsViewer>
                <Editor
                  defaultValue={defaultResults}
                  language="json"
                  optionOverrides={{ lineNumbers: 'off' }} // don't display line number in results viewer
                  hashedUri={resultsUri}
                  value={results || ''}
                  valueSetter={setResults}
                />
              </ResultsViewer>
            ),
            initialWidthPercent: 50,
          }}
        />
      </EditorGroupInner>
    </EditorGroupWrap>
  );
};
