import { useEffect } from 'react';
import cuid from 'cuid';

/** components */
import { Header } from '../Header';
import { Resizer } from '@graphiql-v2-prototype/graphiql-ui-library';
import { Operate } from '../Operate';
import { Analyze } from '../Analyze/Analyze';

/** constants */
import { defaultOperation, defaultResults, defaultVariables } from '../../constants';

/** hooks */
import { useGraphiQLEditor } from '../../hooks';

/** utils */
import { getOrCreateModel } from '../../utils';

/** styles */
import { EditorWrap, EditorInner } from './styles';

const defaultTabName = '<untitled>';
const defaultTabId = cuid.slug();

export const GraphiQLEditor = () => {
  const { setActiveEditorTabId, addEditorTab, schemaUrl } = useGraphiQLEditor();

  // console.log('rendering GraphiQLEditor', { editorTabs, activeEditorTabId });

  // create the models for our initial tab
  const operationModel = getOrCreateModel({
    uri: `${defaultTabId}-operations.graphql`,
    value: defaultOperation,
  });
  const variablesModel = getOrCreateModel({
    uri: `${defaultTabId}-variables.json`,
    value: defaultVariables,
  });
  const resultsModel = getOrCreateModel({
    uri: `${defaultTabId}-results.json`,
    value: defaultResults,
  });

  const initEditor = () => {
    // initialize a starting tab
    addEditorTab({
      editorTab: {
        editorTabId: defaultTabId,
        editorTabName: defaultTabName,
        operationModel,
        variablesModel,
        resultsModel,
        operationDefinition: null,
      },
    });

    //set it active
    setActiveEditorTabId({ editorTabId: defaultTabId });
  };

  useEffect(() => {
    // schemaUrl is changing, do something drastic
    initEditor();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemaUrl]);

  useEffect(() => {
    initEditor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <EditorWrap>
      <EditorInner>
        <Header />
        <Resizer
          direction="horizontal"
          handleStyle="bar"
          pane1={{
            initialFlexGrowValue: 1,
            component: (
              <Operate operationModel={operationModel} variablesModel={variablesModel} />
            ),
          }}
          pane2={{ component: <Analyze resultsModel={resultsModel} /> }}
        />
      </EditorInner>
    </EditorWrap>
  );
};
