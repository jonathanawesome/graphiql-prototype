import { useEffect } from 'react';
import { Uri } from 'monaco-editor';
import { initializeMode } from 'monaco-graphql/esm/initializeMode';
import { GraphQLSchema } from 'graphql';

/** components */
import { Editor, EditorStack } from '../index';

/** constants */
import { EDITOR_URIS, SCHEMA_URI } from '../../constants';

/** layouts */
import { HorizontallyResizableContainer } from '../../layouts';

/** styles */
import { EditorGroupInner, EditorGroupWrap, ResultsViewer } from './styles';

export const EditorGroup = ({
  defaultResults,
  results,
  schema,
  setResults,
}: {
  defaultResults: string;
  results: string;
  schema: GraphQLSchema;
  setResults: ({ value }: { value: string }) => void;
}) => {
  useEffect(() => {
    if (schema) {
      initializeMode({
        diagnosticSettings: {
          validateVariablesJSON: {
            [Uri.file(EDITOR_URIS['OPERATIONS_EDITOR_URI']).toString()]: [
              Uri.file(EDITOR_URIS['VARIABLES_EDITOR_URI']).toString(),
            ],
          },
          jsonDiagnosticSettings: {
            validate: true,
            schemaValidation: 'error',
            allowComments: true,
            trailingCommas: 'ignore',
          },
        },
        schemas: [
          {
            schema,
            uri: SCHEMA_URI,
          },
        ],
      });
    }
  }, [schema]);

  return (
    <EditorGroupWrap>
      <EditorGroupInner>
        {/* <Tabs /> */}
        <HorizontallyResizableContainer
          leftPane={{
            component: <EditorStack />,
            initialWidthPercent: 50,
          }}
          rightPane={{
            component: (
              <ResultsViewer>
                <Editor
                  defaultValue={defaultResults}
                  language="json"
                  optionOverrides={{ lineNumbers: 'off' }} // don't display line number in results viewer
                  uri="RESULTS_VIEWER_URI"
                  value={results}
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
