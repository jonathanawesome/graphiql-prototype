import React, { useEffect } from 'react';

// hooks
import { useSchema } from '@graphiql-prototype/use-schema';

// styles
import { globalStyles } from '@graphiql-prototype/ui-library';

export const Provider = ({ children }: { children: React.ReactNode }) => {
  globalStyles();
  
  const { initSchema } = useSchema();

  useEffect(() => {
    initSchema({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
};
