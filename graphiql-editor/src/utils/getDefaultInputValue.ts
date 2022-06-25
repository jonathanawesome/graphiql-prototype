export const getDefaultInputValue = ({
  typeNameAsString,
}: {
  typeNameAsString: string;
}) => {
  switch (typeNameAsString) {
    case 'Float':
      return 1.23;
    case 'Int':
      return 123;
    case 'ID':
      return 'TK421';
    case 'String':
      return 'meowwoof';
    default:
      return `***handling ${typeNameAsString} as a string***`;
  }
};
