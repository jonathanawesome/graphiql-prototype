export type HTTPHeaderValue = {
  id: string;
  enabled: boolean;
  isRequired: boolean;
  key: string;
  value: string;
};

export type HTTPHeaderPlacement = 'GLOBAL' | 'ACTIVE_TAB';

export type UpdateHeaderKeyOrValue = {
  keyOrValue: 'key' | 'value';
  value: string;
};

export type UpdateHeaderStatus = {
  enabled: boolean;
};

export type HTTPHeadersStore = {
  globalHeaders: HTTPHeaderValue[];
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
