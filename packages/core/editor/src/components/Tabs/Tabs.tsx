// components
import { AddTabButton } from '../AddTabButton';
import { Tab } from '../Tab';

// hooks
import { useEditor } from '@graphiql-prototype/use-editor';

// styles
import { HeaderWrap, TabList, GraphiQLLink } from './styles';

export const Tabs = () => {
  const { activeEditorTabId, editorTabs } = useEditor();

  return (
    <HeaderWrap>
      <TabList>
        {editorTabs.map((tab) => (
          <Tab
            key={tab.editorTabId}
            editorTabId={tab.editorTabId}
            isActive={activeEditorTabId === tab.editorTabId}
          />
        ))}
        {editorTabs.length > 1 && <AddTabButton />}
      </TabList>
      {editorTabs.length < 2 && <AddTabButton />}
      <GraphiQLLink>
        <a href="https://github.com/graphql/graphiql" target="_blank" rel="noreferrer">
          Graph<i>i</i>
          QL
        </a>
      </GraphiQLLink>
    </HeaderWrap>
  );
};
