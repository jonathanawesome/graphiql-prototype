import { useEffect } from 'react';
import cuid from 'cuid';
import { defaultOperation, defaultResults, defaultVariables } from '../../constants';

/** components */
import {
  Close,
  HorizontallyResizableContainer,
} from '@graphiql-v2-prototype/graphiql-ui-library';
import { Operate } from '../Operate';
import { Analyze } from '../Analyze/Analyze';

/** hooks */
import { useGraphiQLEditor } from '../../hooks';

/** utils */
import { getOrCreateModel } from '../../utils';

/** styles */
import {
  AddTabButton,
  GraphiQLLink,
  EditorTabControls,
  EditorWrap,
  EditorInner,
  TabButton,
  TabButtonRow,
} from './styles';

const defaultTabName = 'DEFAULT_TAB';
const defaultTabId = cuid.slug();

export const GraphiQLEditor = () => {
  const {
    activeEditorTabId,
    setActiveEditorTabId,
    monacoEditors,
    editorTabs,
    addEditorTab,
    swapEditorTab,
  } = useGraphiQLEditor();

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

  console.log('rendering Editor', {
    monacoEditors: monacoEditors.map((e) => e.editor.getModel()?.getValue()),
    editorTabs,
    activeEditorTabId,
  });

  useEffect(() => {
    addEditorTab({
      editorTab: {
        editorTabId: defaultTabId,
        editorTabName: defaultTabName,
        operationModel,
        variablesModel,
        resultsModel,
        operation: defaultOperation,
        variables: defaultVariables,
        results: defaultResults,
        operationDefinition: null,
      },
    });
    setActiveEditorTabId({ editorTabId: defaultTabId });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doAddTab = () => {
    const editorTabId = cuid.slug();
    addEditorTab({
      editorTab: {
        editorTabId,
        editorTabName: editorTabId,
        operationModel: getOrCreateModel({
          uri: `${editorTabId}-operations.graphql`,
          value: defaultOperation,
        }),
        variablesModel: getOrCreateModel({
          uri: `${editorTabId}-variables.json`,
          value: defaultVariables,
        }),
        resultsModel: getOrCreateModel({
          uri: `${editorTabId}-results.json`,
          value: defaultResults,
        }),
        operation: defaultOperation,
        variables: defaultVariables,
        results: defaultResults,
        operationDefinition: null,
      },
    });
  };

  const handleTabChange = ({ editorTabId }: { editorTabId: string }) => {
    setActiveEditorTabId({ editorTabId });
    swapEditorTab({ editorTabId });
  };

  if (editorTabs.length === 0) {
    return <p>loading...</p>;
  }

  return (
    <EditorWrap>
      <EditorInner>
        <EditorTabControls>
          <TabButtonRow>
            {editorTabs.map((t) => (
              <TabButton
                key={t.editorTabId}
                disabled={t.editorTabId === activeEditorTabId}
                onClick={() => handleTabChange({ editorTabId: t.editorTabId })}
                isActive={t.editorTabId === activeEditorTabId}
              >
                {t.editorTabName}
              </TabButton>
            ))}
            <AddTabButton onClick={() => doAddTab()}>
              Add Tab <Close />
            </AddTabButton>
          </TabButtonRow>
          <GraphiQLLink>
            <a>
              Graph<i>i</i>
              QL
            </a>
          </GraphiQLLink>
        </EditorTabControls>
        <HorizontallyResizableContainer
          leftPane={{
            component: (
              <Operate operationModel={operationModel} variablesModel={variablesModel} />
            ),
            initialWidthPercent: 50,
          }}
          rightPane={{
            component: <Analyze resultsModel={resultsModel} />,
            initialWidthPercent: 50,
          }}
        />
      </EditorInner>
    </EditorWrap>
  );
};
