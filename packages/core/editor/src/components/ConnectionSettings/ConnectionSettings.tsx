import { useEffect, useRef, useState } from 'react';

// components
import { Button, HTTPHeaderControl, Tabs } from '@graphiql-prototype/ui-library';
import { SchemaSelector } from './SchemaSelector';

// hooks
import { useHTTPHeaders, useSchema } from '@graphiql-prototype/store';

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
    <div className={StyledGlobalHeaders()}>
      <HTTPHeaderControl placement="GLOBAL" values={globalHeaders} />
    </div>
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
    <div className={StyledConnectionSettings()} ref={wrapRef}>
      <div className={StyledRefreshButtonWrap({ schemaLoading })}>
        <Button
          action={() => loadSchema({ url: useSchema.getState().schemaUrl as string })}
          icon="Refresh"
          label="Refresh schema"
          size="LARGE"
          style="ICON"
        />
      </div>

      <div className={StyledSettingsWrap()}>
        <button
          className={StyledActiveURL()}
          onClick={() => setSettingsOpen(!settingsOpen)}
        >
          <span>Active schema URL</span>
          {schemaUrl}
        </button>
        {settingsOpen && (
          <div className={StyledSettingsPanel()}>
            <Tabs
              ariaLabel="Connection settings"
              initialSelectedTab="Public schemas"
              tabbedContent={[
                {
                  name: 'Public schemas',
                  panel: <SchemaSelector />,
                  panelId: 'Public schemas',
                  tabId: 'Public schemas',
                },
                {
                  name: 'Connection settings',
                  panel: (
                    <div className={StyledConnectionSettingsTab()}>
                      <span>Todo:</span>
                      <ul>
                        <li>Polling / Refresh config</li>
                        <li>SSE/WS config</li>
                        <li>HTTP GET/POST</li>
                      </ul>
                    </div>
                  ),
                  panelId: 'Connection settings',
                  tabId: 'Connection settings',
                },
                {
                  name: 'Global HTTP Headers',
                  panel: <GlobalHeaders />,
                  panelId: 'Global HTTP Headers',
                  tabId: 'Global HTTP Headers',
                },
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
};
