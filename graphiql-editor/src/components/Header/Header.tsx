import cuid from 'cuid';

/** components */
import { Plus } from '@graphiql-v2-prototype/graphiql-ui-library';
import { Tab } from '../Tab';

/** constants */
import { defaultResults, defaultVariables } from '../../constants';

/** hooks */
import { useGraphiQLEditor } from '../../hooks';

/** styles */
import { AddTabButton, HeaderWrap, TabsRow, GraphiQLLink } from './styles';

/** utils */
import { getOrCreateModel } from '../../utils';

const AddTab = ({ doAddTab }: { doAddTab: () => void }) => {
  return (
    <AddTabButton onClick={() => doAddTab()}>
      <Plus />
    </AddTabButton>
  );
};

export const Header = () => {
  const { activeEditorTabId, setActiveEditorTabId, editorTabs, addEditorTab } =
    useGraphiQLEditor();

  const doAddTab = () => {
    const editorTabId = cuid.slug();
    addEditorTab({
      editorTab: {
        editorTabId,
        editorTabName: '<untitled>',
        operationModel: getOrCreateModel({
          uri: `${editorTabId}-operations.graphql`,
          value: '',
        }),
        variablesModel: getOrCreateModel({
          uri: `${editorTabId}-variables.json`,
          value: defaultVariables,
        }),
        resultsModel: getOrCreateModel({
          uri: `${editorTabId}-results.json`,
          value: defaultResults,
        }),
        operation: '',
        variables: defaultVariables,
        results: defaultResults,
        operationDefinition: null,
      },
    });
    setActiveEditorTabId({ editorTabId });
  };

  return (
    <HeaderWrap>
      <TabsRow>
        {editorTabs.length < 2
          ? null
          : editorTabs.map((tab) => (
              <Tab
                key={tab.editorTabId}
                editorTabId={tab.editorTabId}
                isActive={activeEditorTabId === tab.editorTabId}
              />
            ))}
        {editorTabs.length > 1 && <AddTab doAddTab={doAddTab} />}
      </TabsRow>
      {editorTabs.length < 2 && <AddTab doAddTab={doAddTab} />}
      <GraphiQLLink>
        <a>
          Graph<i>i</i>
          QL
        </a>
      </GraphiQLLink>
    </HeaderWrap>
  );
};
