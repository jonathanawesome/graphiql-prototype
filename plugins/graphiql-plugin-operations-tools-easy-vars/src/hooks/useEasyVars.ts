import create from 'zustand';

import { isEnumType } from 'graphql';

/** types */
import { EasyVarsStore } from './types';

/** utils */
import { unwrapInputType } from '../../utils';

/** test schema */

export const useGraphiQL = create<EasyVarsStore>((set, get) => ({
  variables: [],
  addVariable: ({ easyVar }) => {
    const variables = get().variables;
    const existingEasyVar = variables.find(
      (v) => v.variableName === easyVar.variableName
    );
    // console.log('addVariable', easyVar);
    if (!existingEasyVar) {
      // doesn't exist, let's add it
      const unwrappedInputType = unwrapInputType({ inputType: easyVar.variableType });
      if (isEnumType(unwrappedInputType)) {
        const defaultValue = unwrappedInputType.getValues()[0].value;
        easyVar.variableValue = defaultValue;
        set({ variables: [...variables, easyVar] });
      } else if (unwrappedInputType.name === 'Boolean') {
        easyVar.variableValue = 'true';
        set({ variables: [...variables, easyVar] });
      } else {
        set({ variables: [...variables, easyVar] });
      }
    }
  },
}));
