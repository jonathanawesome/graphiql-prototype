import { capitalize } from './capitalize';

export const buildVariableNameValue = ({
  fieldName,
  parentArgName,
  argName,
}: {
  fieldName: string;
  parentArgName: string | null;
  argName: string;
}): string => {
  // console.log('running buildVariableNameValue:', { fieldName, parentArgName, argName });

  const parentArgOrEmptyString = parentArgName ? capitalize(parentArgName) : '';
  return `${fieldName}${parentArgOrEmptyString}${capitalize(argName)}`;
};
