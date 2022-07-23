// Edit an assertion and save to see HMR in action
import { describe, expect, it } from 'vitest';
// import { useGraphiQLSchema } from '@graphiql-prototype/graphiql-editor';
// import { act, renderHook } from '@testing-library/react-hooks';
import { render } from '@testing-library/react';
// import { useEffect } from 'react';
import { Pathfinder } from './components/Pathfinder/Pathfinder';
// import { useGraphiQLSchema } from '@graphiql-prototype/graphiql-editor';
// import { useEffect } from 'react';
// import { usePathfinder } from './hooks';

// beforeAll(() => {
//   cleanup();
// });

// test('Math.sqrt()', () => {
//   expect(Math.sqrt(4)).toBe(2);
//   expect(Math.sqrt(144)).toBe(12);
//   expect(Math.sqrt(2)).toBe(Math.SQRT2);
// });

// const Wrap = () => {
//   const { initSchema } = useGraphiQLSchema();

//   useEffect(() => {
//     initSchema({ url: 'http://localhost:4000/graphql' });
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return <Pathfinder />;
// };

// test('JSON', () => {
//   const input = {
//     foo: 'hello',
//     bar: 'world',
//   };

//   const output = JSON.stringify(input);

//   expect(output).eq('{"foo":"hello","bar":"world"}');
//   assert.deepEqual(JSON.parse(output), input, 'matches original');
// });

describe('Pathfinder - Root Types', () => {
  it('should display root types', () => {
    const { getByRole } = render(<Pathfinder />);

    // updateModel({
    //   modelType: 'operationModel',
    //   newValue: defaultOperation,
    // });

    const deferrable = getByRole('button', { name: 'Toggle deferrable' });
    // console.log('deferreable', { deferrable });
    // expect();
    expect(deferrable).toHaveAttribute('aria-pressed', 'false');

    // const { result } = renderHook(() => usePathfinder());
    // act(() => {
    //   result.current.
    // });
    // expect(result.current.count).toBe(1);
  });
  // it('foo', () => {
  //   assert.equal(Math.sqrt(4), 2);
  // });

  // it('bar', () => {
  //   expect(1 + 1).eq(2);
  // });

  // it('snapshot', () => {
  //   expect({ foo: 'bar' }).toMatchSnapshot();
  // });
});
