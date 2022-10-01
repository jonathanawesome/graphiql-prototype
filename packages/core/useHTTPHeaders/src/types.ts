export type HTTPHeaderValue = {
  id: string;
  enabled: boolean;
  isRequired: boolean;
  key: string;
  value: string;
};

export type HTTPHeaderPlacement = 'GLOBAL' | 'ACTIVE_TAB';

type UpdateHeaderKeyOrValue = {
  keyOrValue: 'key' | 'value';
  value: string;
};

type UpdateHeaderStatus = {
  enabled: boolean;
};

export type HTTPHeadersStore = {
  globalHeaders: Array<HTTPHeaderValue>;
  addHeader: ({ placement }: { placement: HTTPHeaderPlacement }) => void;
  removeHeader: ({
    id,
    placement,
  }: {
    id: string;
    placement: HTTPHeaderPlacement;
  }) => void;
  updateHeader: ({
    id,
    payload,
    placement,
  }: {
    id: string;
    payload: UpdateHeaderKeyOrValue | UpdateHeaderStatus;
    placement: HTTPHeaderPlacement;
  }) => void;
};
