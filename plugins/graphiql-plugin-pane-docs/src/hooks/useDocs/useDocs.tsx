import create from 'zustand';

// types
import { DocsStore } from './types';

export const useDocs = create<DocsStore>((set, get) => ({
  docsInstances: new Map(),
  getDocsInstance: ({ placement }) => {
    const docsInstances = get().docsInstances;
    const targetInstance = docsInstances.get(placement);
    if (!targetInstance) {
      console.log(`getDocsInstance: Docs instance at ${placement} does not exist.`);
      return undefined;
    }
    return targetInstance;
  },
  initDocsInstance: ({ docPane, placement }) => {
    const docsInstances = get().docsInstances;
    set({
      docsInstances: docsInstances.set(placement, {
        activeDocPane: docPane || null,
        docPanes: docPane ? [docPane] : [],
        placement,
      }),
    });
  },
  resetDocInstance: ({ placement }) => {
    const docsInstances = get().docsInstances;
    set({
      docsInstances: docsInstances.set(placement, {
        activeDocPane: null,
        docPanes: [],
        placement,
      }),
    });
  },
  navigateBack: ({ placement }) => {
    const docsInstances = get().docsInstances;
    const targetInstance = docsInstances.get(placement);

    if (targetInstance) {
      const docPanes = targetInstance.docPanes;
      const newDocPanes = docPanes.filter((_, i) => i < docPanes.length - 1);
      set({
        docsInstances: docsInstances.set(placement, {
          activeDocPane: newDocPanes[newDocPanes.length - 1],
          docPanes: newDocPanes,
          placement,
        }),
      });
    } else {
      console.log(`navigateBack: Docs instance at ${placement} does not exist.`);
    }
  },
  navigateForward: ({ docPane, placement }) => {
    const docsInstances = get().docsInstances;
    const targetInstance = docsInstances.get(placement);

    // console.log('navigateForward', { docsInstances, targetInstance });

    if (targetInstance) {
      const docPanes = targetInstance.docPanes;
      set({
        docsInstances: docsInstances.set(placement, {
          activeDocPane: docPane,
          docPanes: [...docPanes, docPane],
          placement,
        }),
      });
    } else {
      console.log(`navigateForward: Docs instance at ${placement} does not exist.`);
    }
  },
}));
