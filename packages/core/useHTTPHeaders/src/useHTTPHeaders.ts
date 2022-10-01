import cuid from 'cuid';
import create from 'zustand';

// constan

// types
import { HTTPHeadersStore, HTTPHeaderValue } from './types';

const CT_APPJSON: HTTPHeaderValue = {
  id: cuid.slug(),
  enabled: true,
  isRequired: true,
  key: 'Content-Type',
  value: 'application/json',
};

export const useHTTPHeaders = create<HTTPHeadersStore>((set, get) => ({
  globalHeaders: [CT_APPJSON],
  addHeader: ({ placement }) => {
    if (placement === 'GLOBAL') {
      const globalHeaders = get().globalHeaders;
      set({
        globalHeaders: [
          ...globalHeaders,
          { id: cuid.slug(), enabled: false, isRequired: false, key: '', value: '' },
        ],
      });
    } else {
      // TODO: add tab header
    }
  },
  removeHeader: ({ id, placement }) => {
    if (placement === 'GLOBAL') {
      const globalHeaders = get().globalHeaders;
      set({
        globalHeaders: globalHeaders.filter((globalHeader) => globalHeader.id !== id),
      });
    } else {
      // TODO: remove tab header
    }
  },
  updateHeader: ({ id, payload, placement }) => {
    if (placement === 'GLOBAL') {
      const globalHeaders = [...get().globalHeaders];
      const existingHeaderIndex = globalHeaders.findIndex(
        (globalHeader) => globalHeader.id === id
      );

      const update =
        'keyOrValue' in payload
          ? { [payload.keyOrValue]: payload.value }
          : { enabled: payload.enabled };
      console.log('updateHeader', { id, payload, placement, update });

      globalHeaders[existingHeaderIndex] = {
        ...globalHeaders[existingHeaderIndex],
        ...update,
      };

      set({ globalHeaders });
    } else {
      // TODO: update active tab header here
    }
  },
}));
