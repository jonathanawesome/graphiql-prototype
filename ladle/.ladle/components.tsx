import React, { useEffect } from 'react';
// import type { GlobalProvider } from "@ladle/react";

/** hooks */
import { useGraphiQL } from '../src/hooks/useGraphiQL'

/** theme */
import { globalStyles } from '../src/theme';


export const Provider = ({ children}: {children: React.ReactNode}) => {
  globalStyles();

  const { initSchema } = useGraphiQL();

  useEffect(() => {
    initSchema();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return children
};

