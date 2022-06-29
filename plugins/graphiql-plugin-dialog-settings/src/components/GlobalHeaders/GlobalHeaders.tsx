import React, { useEffect, useState } from 'react';

// components
import { HeaderInput } from '../HeaderInput';

// hooks
import { useGraphiQLGlobalHeaders } from '@graphiql-v2-prototype/graphiql-editor';

// styles
import { SettingsItem, SettingsItemLead } from '../Settings/styles';
import { AddNewHeaderButton, GlobalHeadersStyled } from './styles';

export const GlobalHeaders = () => {
  const [inputs, setInputs] = useState<Array<React.ReactElement>>();
  const { addGlobalHeader, globalHeaders } = useGraphiQLGlobalHeaders();

  useEffect(() => {
    if (globalHeaders) {
      setInputs(
        globalHeaders.map((globalHeader) => {
          return <HeaderInput key={globalHeader.id} headerData={globalHeader} />;
        })
      );
    }
  }, [globalHeaders]);

  return (
    <GlobalHeadersStyled>
      <SettingsItem>
        <SettingsItemLead>
          <span>Global Headers</span>
          <p>
            These headers will be included with every operation, including the initial
            introspection query. For per-operation headers, use the Headers pane within
            each tab.
          </p>
        </SettingsItemLead>
        {inputs?.map((i) => i)}
        <AddNewHeaderButton onClick={() => addGlobalHeader()}>
          Add header
        </AddNewHeaderButton>
      </SettingsItem>
    </GlobalHeadersStyled>
  );
};
