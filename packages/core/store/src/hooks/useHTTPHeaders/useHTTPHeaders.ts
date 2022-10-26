import cuid from 'cuid';
import create from 'zustand';

// hooks
import { useEditor } from '../useEditor';

// types
import { HTTPHeadersStore, HTTPHeaderValue } from './types';

const CT_APPJSON: HTTPHeaderValue = {
  id: cuid.slug(),
  enabled: true,
  isRequired: true,
  key: 'Content-Type',
  value: 'application/json',
};

export const baseHeader = ({ id }: { id: string }) => ({
  id,
  enabled: false,
  isRequired: false,
  key: '',
  value: '',
});

export const useHTTPHeaders = create<HTTPHeadersStore>((set, get) => ({
  globalHeaders: [CT_APPJSON],
  addHeader: ({ placement }) => {
    if (placement === 'GLOBAL') {
      const globalHeaders = get().globalHeaders;
      set({
        globalHeaders: [...globalHeaders, baseHeader({ id: cuid.slug() })],
      });
    } else {
      const activeTabHeaders = useEditor.getState().getActiveTab().headers;
      const updateActiveTabState = useEditor.getState().updateActiveTabState;
      updateActiveTabState({
        data: { headers: [...activeTabHeaders, baseHeader({ id: cuid.slug() })] },
      });
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
      const activeTabHeaders = useEditor.getState().getActiveTab().headers;
      const updateActiveTabState = useEditor.getState().updateActiveTabState;
      updateActiveTabState({
        data: { headers: activeTabHeaders.filter((header) => header.id !== id) },
      });
    }
  },
  updateHeader: ({ id, payload, placement }) => {
    const update =
      'keyOrValue' in payload
        ? { [payload.keyOrValue]: payload.value }
        : { enabled: payload.enabled };

    // console.log('updateHeader', { id, payload, placement, update });

    if (placement === 'GLOBAL') {
      const globalHeaders = [...get().globalHeaders];
      const existingHeaderIndex = globalHeaders.findIndex(
        (globalHeader) => globalHeader.id === id
      );

      globalHeaders[existingHeaderIndex] = {
        ...globalHeaders[existingHeaderIndex],
        ...update,
      };

      set({ globalHeaders });
    } else {
      // TODO: update active tab header here
      const activeTabHeaders = useEditor.getState().getActiveTab().headers;
      const updateActiveTabState = useEditor.getState().updateActiveTabState;
      const existingHeaderIndex = activeTabHeaders.findIndex(
        (header) => header.id === id
      );

      activeTabHeaders[existingHeaderIndex] = {
        ...activeTabHeaders[existingHeaderIndex],
        ...update,
      };
      updateActiveTabState({
        data: {
          headers: activeTabHeaders,
        },
      });
    }
  },
}));
