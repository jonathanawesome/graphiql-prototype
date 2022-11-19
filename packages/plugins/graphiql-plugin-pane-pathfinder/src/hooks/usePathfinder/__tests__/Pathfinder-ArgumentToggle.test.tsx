import {
  describe,
  // expect,
  it,
} from 'vitest';
import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// components
import { Pathfinder } from '../../../components';

// hooks
// import { useEditor } from '@graphiql-prototype/store';
import { useSchema } from '@graphiql-prototype/store';

beforeEach(async () => {
  // the current state of schema hook
  const { result: schemaHookResult } = renderHook(() => useSchema());

  // initialize default schema (testSchema)
  act(() => {
    schemaHookResult.current.loadSchema({ init: true, url: 'GraphiQL Test Schema' });
  });

  // render Pathfinder UI
  render(<Pathfinder />);

  // the collapse control for the field
  const hasArgsExpandButton = screen.getByRole('button', {
    name: 'Expand nested content of hasArgs FIELD',
  });

  // this click expands the field so we have access to the arguments collapser
  await userEvent.click(hasArgsExpandButton);

  // the collapse control for arguments
  const hasArgsArgumentsExpandButton = screen.getByRole('button', {
    name: 'Expand nested content of hasArgs arguments',
  });

  // this click expands the field arguments
  await userEvent.click(hasArgsArgumentsExpandButton);
});

describe('Pathfinder | Toggler - Argument', () => {
  it('Argument toggle buttons should respond correctly when clicked', async () => {
    console.log('TODO!');
  });
  // it('Argument toggle buttons should respond correctly when clicked', async () => {
  //   // the current state of editor hook
  //   const { result: editorHookResult } = renderHook(() => useEditor());
  //   // now we can locate our toggle buttons
  //   const togglehasArgsStringButton = screen.getByRole('button', {
  //     name: 'Add hasArgs/string ARGUMENT to operation',
  //   });
  //   const togglehasArgsIntButton = screen.getByRole('button', {
  //     name: 'Add hasArgs/int ARGUMENT to operation',
  //   });
  //   const togglehasArgsObjectButton = screen.getByRole('button', {
  //     name: 'Add hasArgs/object ARGUMENT to operation',
  //   });
  //   // toggle ON the hasArgs/string argument
  //   await userEvent.click(togglehasArgsStringButton);
  //   // operations editor should be:
  //   expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
  //     `query Tab1($string: String) {\n  hasArgs(string: $string)\n}`
  //   );
  //   // toggle ON the hasArgs/int argument
  //   await userEvent.click(togglehasArgsIntButton);
  //   // operations editor should be:
  //   expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
  //     `query Tab1($string: String, $int: Int) {\n  hasArgs(string: $string, int: $int)\n}`
  //   );
  //   // toggle OFF the hasArgs/string argument
  //   await userEvent.click(togglehasArgsStringButton);
  //   // operations editor should be:
  //   expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
  //     `query Tab1($int: Int) {\n  hasArgs(int: $int)\n}`
  //   );
  //   // toggle ON the hasArgs/object argument
  //   await userEvent.click(togglehasArgsObjectButton);
  //   // operations editor should be:
  //   expect(editorHookResult.current.getActiveTab().operationsModel.getValue()).toEqual(
  //     `query Tab1($int: Int, $object: TestInput) {\n  hasArgs(int: $int, object: $object)\n}`
  //   );
  // });
  // it('typing into input fields should properly update variables editor', async () => {
  //   // render Pathfinder UI
  //   render(<Pathfinder />);
  //   // the current state of editor hook
  //   const { result: editorHookResult } = renderHook(() => useEditor());
  //   // input for hasArgsString
  //   const hasArgsString = screen.getByTestId('input-string');
  //   await userEvent.type(hasArgsString, 'x');
  //   // variables editor should be:
  //   expect(editorHookResult.current.getActiveTab().variablesModel.getValue()).toEqual(
  //     `{\n "string": "x"\n}`
  //   );
  //   // input for hasArgsInt
  //   const hasArgsInt = screen.getByTestId('input-int');
  //   await userEvent.type(hasArgsInt, '12');
  //   // variables editor should be:
  //   expect(editorHookResult.current.getActiveTab().variablesModel.getValue()).toEqual(
  //     `{\n "string": "x",\n "int": 12\n}`
  //   );
  //   await userEvent.type(hasArgsString, '[Backspace]', { initialSelectionStart: 1 });
  //   // quick check that our value is clear after backspace 👆
  //   expect(hasArgsString).toHaveValue('');
  //   // variables editor should be:
  //   expect(editorHookResult.current.getActiveTab().variablesModel.getValue()).toEqual(
  //     `{\n "string": "",\n "int": 12\n}`
  //   );
  //   // the collapse control for hasArgs/object
  //   const hasArgsObjectExpandButton = screen.getByRole('button', {
  //     name: 'Expand nested content of object INPUT_OBJECT',
  //   });
  //   // this click expands the hasArgs/object input object
  //   await userEvent.click(hasArgsObjectExpandButton);
  //   // input for hasArgsString
  //   const hasArgsObjectString = screen.getByTestId('input-object-string');
  //   await userEvent.type(hasArgsObjectString, 'y');
  //   // variables editor should be:
  //   expect(editorHookResult.current.getActiveTab().variablesModel.getValue()).toEqual(
  //     `{\n "string": "",\n "int": 12,\n "object": {\n  "string": "y"\n }\n}`
  //   );
  // });
});
