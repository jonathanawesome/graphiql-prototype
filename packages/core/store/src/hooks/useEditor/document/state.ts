import { DocumentState } from './types';

export const documentState: DocumentState = {
  activeDefinition: null,
  editorDecorations: {
    new: [],
    existing: [],
  },
  // newDecorations: [],
  // existingDecorations: [],
  hasActiveDefinition: false,
  documentDefinitions: 0,
};
