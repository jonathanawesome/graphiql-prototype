export const defaultInputValue = ({ typeNameAsString }: { typeNameAsString: string }) => {
  switch (typeNameAsString) {
    case 'Float':
      return '1.23';
    case 'Int':
      return '123';
    case 'ID':
      return 'cl3mbj6ta002z3e0wfn017z27';
    case 'String':
      return 'meowwoof';
    default:
      return 'Whoops...';
  }
};
