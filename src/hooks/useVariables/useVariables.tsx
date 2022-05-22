import create from 'zustand';

/** constants */
import { defaultVariables } from '@/constants';

export type StringEasyVariableValue = string;
export type IntEasyVariableValue = number;
export type EnumEasyVariableValue = Array<string>;
export type BooleanEasyVariableValue = ['true', 'false'];

export type StringEasyVariable = Record<string, StringEasyVariableValue>;
export type IntEasyVariable = Record<string, IntEasyVariableValue>;
export type EnumEasyVariable = Record<string, EnumEasyVariableValue>;
export type BooleanEasyVariable = Record<string, BooleanEasyVariableValue>;

// type VariableBase = {
//   name: string;
//   type: 'someVariableType';
//   value: 'someValue';
//   options?: Array<string>;
// };

type EasyVariableOptions =
  | StringEasyVariable
  | IntEasyVariable
  | EnumEasyVariable
  | BooleanEasyVariable;

export type EasyVariable = EasyVariableOptions;

export type VariablesStore = {
  variables: string;
  setVariables: ({ value }: { value: string }) => void;
  easyVariables: Array<EasyVariable>;
  setEasyVariables: ({
    addOrRemove,
    easyVariable,
  }: {
    addOrRemove: 'ADD' | 'REMOVE';
    easyVariable: EasyVariable;
  }) => void;
};

export const useVariables = create<VariablesStore>((set, get) => ({
  variables: defaultVariables,
  setVariables: ({ value }) => {
    console.log('setVariables', value);
    set({ variables: value });
  },
  easyVariables: [],
  setEasyVariables: ({ addOrRemove, easyVariable }) => {
    console.log('setEasyVariables', easyVariable);
    const easyVariables = get().easyVariables;
    if (addOrRemove === 'ADD') {
      set({ easyVariables: [...easyVariables, easyVariable] });
    } else {
      // set({ easyVariables: easyVariables.filter((eV) => ) });
    }
  },
}));
