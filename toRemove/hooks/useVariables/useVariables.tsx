import create from 'zustand';
import { defaultVariables } from '../../constants';

type StringVariableValue = string;
type IntVariableValue = number;
type EnumVariableValue = Array<string>;
type BooleanVariableValue = ['true', 'false'];

type StringVariable = Record<string, StringVariableValue>;
type IntVariable = Record<string, IntVariableValue>;
type EnumVariable = Record<string, EnumVariableValue>;
type BooleanVariable = Record<string, BooleanVariableValue>;

type VariableTypes = StringVariable | IntVariable | EnumVariable | BooleanVariable;

type VariableMap = Map<string, VariableTypes>;

type VariableBase = {
  name: string;
  type: 'someVariableType';
  value: 'someValue';
  options?: Array<string>;
};

type VariablesStore = {
  // variables: VariableMap;
  variables: string;
  setVariables: ({ value }: { value: string }) => void;
  // easyVariables: Array<EasyVariable>;
  // setEasyVariables: ({
  //   addOrRemove,
  //   easyVariable,
  // }: {
  //   addOrRemove: 'ADD' | 'REMOVE';
  //   easyVariable: EasyVariable;
  // }) => void;
};

export const useVariables = create<VariablesStore>((set, get) => ({
  variables: defaultVariables,
  setVariables: ({ value }) => {
    console.log('setVariables', value);
    set({ variables: value });
  },
  // variables: new Map(),
  // setVariables: ({ value }) => {
  //   console.log('setVariables', value);
  //   set({ variables: value });
  // },
  // easyVariables: [],
  // setEasyVariables: ({ addOrRemove, easyVariable }) => {
  //   console.log('setEasyVariables', easyVariable);
  //   const easyVariables = get().easyVariables;
  //   if (addOrRemove === 'ADD') {
  //     set({ easyVariables: [...easyVariables, easyVariable] });
  //   } else {
  //     // set({ easyVariables: easyVariables.filter((eV) => ) });
  //   }
  // },
}));
