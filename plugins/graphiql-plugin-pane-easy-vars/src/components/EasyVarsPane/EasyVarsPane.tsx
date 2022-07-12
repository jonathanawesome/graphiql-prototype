import React, { useEffect, useState } from 'react';
import { VariableDefinitionNode } from 'graphql';

// components
import { EasyVars } from '@graphiql-prototype/graphiql-ui-library';

// hooks
import { EditorTab, useGraphiQLEditor } from '@graphiql-prototype/graphiql-editor';

// styles
import {
  EasyVarsPaneStyled,
  ContentStyled,
  HeaderStyled,
  Note,
  ItemStyled,
  TriggerStyled,
} from './styles';

export const EasyVarsPane = () => {
  const [tabs, setTabs] = useState<EditorTab[]>([]);

  const { activeEditorTabId, editorTabs, switchEditorTab } = useGraphiQLEditor();

  const activeEditorTab = editorTabs.find(
    (editorTab) => editorTab.editorTabId === activeEditorTabId
  );

  const sortTabs = ({
    activeEditorTab,
    theTabs,
  }: {
    activeEditorTab: EditorTab;
    theTabs: EditorTab[];
  }) =>
    theTabs.sort((x, y) => (x === activeEditorTab ? -1 : y === activeEditorTab ? 0 : 1));

  useEffect(() => {
    if (activeEditorTab) {
      setTabs(sortTabs({ activeEditorTab, theTabs: [...editorTabs] }));
    }
  }, [activeEditorTab, editorTabs]);

  // console.log('EasyVarsPane', { tabs });

  if (tabs.length < 1) {
    return <p>loading....</p>;
  }

  return (
    <>
      <EasyVarsPaneStyled
        type="single"
        value={activeEditorTab ? activeEditorTab.editorTabId : editorTabs[0].editorTabId}
        onValueChange={(value) => {
          switchEditorTab({ editorTabId: value });
          if (activeEditorTab) {
            setTabs(sortTabs({ activeEditorTab, theTabs: tabs }));
          }
        }}
      >
        {tabs.map((e) => {
          const variableDefinitions = e.operationDefinition?.variableDefinitions;
          return (
            <ItemStyled key={e.editorTabId} value={e.editorTabId}>
              <HeaderStyled>
                <TriggerStyled>
                  <span>{e.editorTabName}</span>
                  <span>{e.operationDefinition?.variableDefinitions?.length || 0}</span>
                </TriggerStyled>
              </HeaderStyled>
              <ContentStyled>
                {variableDefinitions && variableDefinitions.length > 0 ? (
                  <EasyVars
                    key={e.editorTabId}
                    variableDefinitions={
                      (variableDefinitions as VariableDefinitionNode[]) || []
                    }
                  />
                ) : (
                  <Note>There are no variables defined for this tab</Note>
                )}
              </ContentStyled>
            </ItemStyled>
          );
        })}
      </EasyVarsPaneStyled>
    </>
  );
};
