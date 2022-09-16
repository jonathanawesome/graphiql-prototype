// components
import { Button, Tabs } from '@graphiql-prototype/ui-library';

// hooks
import { useEditorPanes } from '../../hooks';
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import {
  StyledActiveURL,
  StyledConnectionSettings,
  StyledRefreshButtonWrap,
  StyledSettingsPanel,
  StyledSettingsWrap,
  StyledWorkspaceNavigation,
  StyledWorkspaceNavigationButton,
} from './styles';
import { useEffect, useRef, useState } from 'react';
import { SchemaSelector } from './SchemaSelector';

export const ConnectionSettings = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

  const { activePane, setActivePane } = useEditorPanes();
  const { loadSchema, schemaUrl, schemaLoading } = useSchema();

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapRef.current && wrapRef?.current.contains(e.target as Node)) {
      return;
    }
    setSettingsOpen(false);
  };

  useEffect(() => {
    if (settingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [settingsOpen]);

  return (
    <StyledConnectionSettings ref={wrapRef}>
      <StyledRefreshButtonWrap schemaLoading={schemaLoading}>
        <Button
          action={() => schemaUrl && loadSchema({ url: schemaUrl })}
          icon="Refresh"
          label="Refresh schema"
          size="LARGE"
          variant="ICON"
        />
      </StyledRefreshButtonWrap>

      <StyledSettingsWrap>
        <StyledActiveURL onClick={() => setSettingsOpen(!settingsOpen)}>
          <span>Active schema URL</span>
          {schemaUrl}
        </StyledActiveURL>
        {settingsOpen && (
          <StyledSettingsPanel>
            <Tabs
              ariaLabel="Connection settins"
              tabbedContent={[
                {
                  id: 'Public schemas',
                  name: 'Public schemas',
                  panel: <SchemaSelector />,
                },
                {
                  id: 'Connection settings',
                  name: 'Connection settings',
                  panel: <h1>connection settings</h1>,
                },
                {
                  id: 'Global HTTP Headers',
                  name: 'Global HTTP Headers',
                  panel: <h1>HTTP Headers</h1>,
                },
              ]}
            />
          </StyledSettingsPanel>
        )}
      </StyledSettingsWrap>

      <StyledWorkspaceNavigation>
        <StyledWorkspaceNavigationButton
          isActive={activePane === 'WORKSPACE'}
          onClick={() => setActivePane({ destinationPane: 'WORKSPACE' })}
        >
          Editor
        </StyledWorkspaceNavigationButton>
        <StyledWorkspaceNavigationButton
          isActive={activePane === 'SCHEMA_REFERENCE'}
          onClick={() => setActivePane({ destinationPane: 'SCHEMA_REFERENCE' })}
        >
          Schema Reference
        </StyledWorkspaceNavigationButton>
      </StyledWorkspaceNavigation>
    </StyledConnectionSettings>
  );
};
