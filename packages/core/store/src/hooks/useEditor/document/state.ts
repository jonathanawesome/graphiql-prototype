import { DocumentState } from './types';

export const documentState: DocumentState = {
  activeDefinition: null,
  editorDecorations: {
    new: [],
    existing: [],
  },
  hasActiveDefinition: false,
  documentDefinitions: 0,
};
