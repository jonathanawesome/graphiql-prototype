export const OPERATIONS_EDITOR_URI = 'operations.graphql';
export const VARIABLES_EDITOR_URI = 'variables.json';
export const RESULTS_VIEWER_URI = 'results.json';
export const SCHEMA_URI = 'mySchema.graphql';

export const EDITOR_URIS = {
  OPERATIONS_EDITOR_URI: 'operations.graphql',
  VARIABLES_EDITOR_URI: 'variables.json',
  RESULTS_VIEWER_URI: 'results.json',
};

export type AvailableEditors = keyof typeof EDITOR_URIS;
