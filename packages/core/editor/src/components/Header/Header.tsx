// components
import { Plus } from '@graphiql-prototype/ui-library';
import { Tab } from './Tab';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';

// styles
import { AddTabButton, HeaderWrap, TabList, GraphiQLLink } from './styles';

const AddTab = () => {
  const { addEditorTab } = useEditor();
  return (
    <AddTabButton onClick={() => addEditorTab()}>
      <Plus />
    </AddTabButton>
  );
};

export const Header = () => {
  const { activeEditorTabId, editorTabs } = useEditor();

  return (
    <HeaderWrap>
      <TabList>
        {editorTabs.length < 2
          ? null
          : editorTabs.map((tab) => (
              <Tab
                key={tab.editorTabId}
                editorTabId={tab.editorTabId}
                isActive={activeEditorTabId === tab.editorTabId}
              />
            ))}
        {editorTabs.length > 1 && <AddTab />}
      </TabList>
      {editorTabs.length < 2 && <AddTab />}
      <GraphiQLLink>
        <a href="https://github.com/graphql/graphiql" target="_blank" rel="noreferrer">
          Graph<i>i</i>
          QL
        </a>
      </GraphiQLLink>
    </HeaderWrap>
  );
};
