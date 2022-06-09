import cuid from 'cuid';

/** components */
import { Plus, Close } from '@graphiql-v2-prototype/graphiql-ui-library';

/** constants */
import { defaultResults, defaultVariables } from '../../constants';

/** hooks */
import { useGraphiQLEditor } from '../../hooks';

/** styles */
import {
  AddTabButton,
  EditorHeader,
  TabRow,
  TabControlsWrap,
  TabButton,
  RemoveTabButton,
  GraphiQLLink,
} from './styles';

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
  const {
    activeEditorTabId,
    setActiveEditorTabId,
    editorTabs,
    addEditorTab,
    removeEditorTab,
    swapEditorTab,
  } = useGraphiQLEditor();

  const doAddTab = () => {
    const editorTabId = cuid.slug();
    addEditorTab({
      editorTab: {
        editorTabId,
        editorTabName: editorTabId,
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

  const doRemoveTab = (editorTabId: string) => {
    removeEditorTab({ editorTabId });
  };

  const handleTabChange = (editorTabId: string) => {
    setActiveEditorTabId({ editorTabId });
    swapEditorTab({ editorTabId });
  };

  return (
    <EditorHeader>
      <TabRow>
        {editorTabs.length === 1
          ? null
          : editorTabs.map((t) => (
              <TabControlsWrap
                key={t.editorTabId}
                isActive={t.editorTabId === activeEditorTabId}
              >
                <TabButton
                  disabled={t.editorTabId === activeEditorTabId}
                  onClick={() => handleTabChange(t.editorTabId)}
                  isActive={t.editorTabId === activeEditorTabId}
                >
                  {t.editorTabName}
                </TabButton>
                {activeEditorTabId === t.editorTabId && (
                  <RemoveTabButton
                    aria-label="Close Tab"
                    onClick={() => doRemoveTab(t.editorTabId)}
                  >
                    <Close />
                  </RemoveTabButton>
                )}
              </TabControlsWrap>
            ))}
        {editorTabs.length > 1 && <AddTab doAddTab={doAddTab} />}
      </TabRow>
      {editorTabs.length === 1 && <AddTab doAddTab={doAddTab} />}
      <GraphiQLLink>
        <a>
          Graph<i>i</i>
          QL
        </a>
      </GraphiQLLink>
    </EditorHeader>
  );
};
