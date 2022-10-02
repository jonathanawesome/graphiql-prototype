import { useEffect, useRef, useState } from 'react';

// components
import { Button, HTTPHeaderControl, Tabs } from '@graphiql-prototype/ui-library';
import { SchemaSelector } from './SchemaSelector';

// hooks
import { useHTTPHeaders } from '@graphiql-prototype/use-http-headers';
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import {
  StyledActiveURL,
  StyledConnectionSettings,
  StyledConnectionSettingsTab,
  StyledGlobalHeaders,
  StyledRefreshButtonWrap,
  StyledSettingsPanel,
  StyledSettingsWrap,
} from './styles';

const GlobalHeaders = () => {
  const { globalHeaders } = useHTTPHeaders();

  return (
    <StyledGlobalHeaders>
      <HTTPHeaderControl placement="GLOBAL" values={globalHeaders} />
    </StyledGlobalHeaders>
  );
};

export const ConnectionSettings = () => {
  const wrapRef = useRef<HTMLDivElement>(null);

  const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

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
          action={() => loadSchema({ url: useSchema.getState().schemaUrl as string })}
          icon="Refresh"
          label="Refresh schema"
          size="LARGE"
          style="ICON"
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
              ariaLabel="Connection settings"
              tabbedContent={[
                {
                  id: 'Public schemas',
                  name: 'Public schemas',
                  panel: <SchemaSelector />,
                },
                {
                  id: 'Connection settings',
                  name: 'Connection settings',
                  panel: (
                    <StyledConnectionSettingsTab>
                      <span>Todo:</span>
                      <ul>
                        <li>Polling / Refresh config</li>
                        <li>SSE/WS config</li>
                        <li>HTTP GET/POST</li>
                      </ul>
                    </StyledConnectionSettingsTab>
                  ),
                },
                {
                  id: 'Global HTTP Headers',
                  name: 'Global HTTP Headers',
                  panel: <GlobalHeaders />,
                },
              ]}
            />
          </StyledSettingsPanel>
        )}
      </StyledSettingsWrap>
    </StyledConnectionSettings>
  );
};
