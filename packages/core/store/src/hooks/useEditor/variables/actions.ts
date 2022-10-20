import { GetEditorStore } from '../types';
import { VariablesActions } from './types';

export const variablesActions = (get: GetEditorStore): VariablesActions => ({
  getVariables: () => {
    const activeEditorTab = get().getActiveTab();
    try {
      return JSON.parse(activeEditorTab.variablesModel.getValue());
    } catch (e) {
      console.warn(e);
      return {};
    }
  },
  updateVariable: async ({ onInputObject, variableName, variableValue }) => {
    const updateModel = get().updateModel;
    const monacoEditors = get().monacoEditors;

    // console.log('running updateVariable', {
    //   onInputObject,
    //   variableName,
    //   variableValue,
    // });

    // parse the existing variables string to an object
    // if the current variables model is undefined, use an empty object string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let parsedVariables: Record<any, any> = {};
    try {
      parsedVariables = await JSON.parse(
        monacoEditors['variables']?.getModel()?.getValue() || '{}'
      );
    } catch (error) {
      console.warn('error parsing variables in updateVariable');
    }

    if (onInputObject) {
      parsedVariables = {
        ...parsedVariables,
        [onInputObject]: {
          ...parsedVariables[onInputObject],
          [variableName]: variableValue,
        },
      };
    } else {
      parsedVariables[variableName] = variableValue;
    }

    // return to string
    const newVariablesString = JSON.stringify(parsedVariables, null, ' ');

    // update the model
    return updateModel({
      edits: [
        {
          text: newVariablesString,
        },
      ],
      targetEditor: 'variables',
    });
  },
});
