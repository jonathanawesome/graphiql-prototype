import cuid from 'cuid';
import create from 'zustand';

// types
import { GraphiQLGlobalHeadersStore } from './types';

export const useGraphiQLGlobalHeaders = create<GraphiQLGlobalHeadersStore>(
  (set, get) => ({
    globalHeaders: [
      { id: cuid.slug(), header: { name: 'Content-Type', value: 'application/json' } },
    ],
    addGlobalHeader: () => {
      const globalHeaders = get().globalHeaders;
      set({
        globalHeaders: [
          ...globalHeaders,
          { id: cuid.slug(), header: { name: '', value: '' } },
        ],
      });
    },
    removeGlobalHeader: ({ id }) => {
      const globalHeaders = get().globalHeaders;
      set({
        globalHeaders: globalHeaders.filter((globalHeader) => globalHeader.id !== id),
      });
    },
    updateGlobalHeader: ({ id, name, value }) => {
      // console.log('updateGlobalHeader', { id, name, value });
      const globalHeaders = get().globalHeaders;
      const globalHeadersCopy = [...globalHeaders];
      const existingHeaderIndex = globalHeadersCopy.findIndex(
        (globalHeader) => globalHeader.id === id
      );

      globalHeadersCopy[existingHeaderIndex] = {
        ...globalHeadersCopy[existingHeaderIndex],
        header: {
          ...globalHeadersCopy[existingHeaderIndex]['header'],
          [name]: value,
        },
      };

      set({ globalHeaders: globalHeadersCopy });
    },
  })
);
