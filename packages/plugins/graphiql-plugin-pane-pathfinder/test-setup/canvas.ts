import {
  // afterAll,
  vi,
} from 'vitest';

global.jest = vi;
import 'jest-canvas-mock';
// import getCanvasWindow from 'jest-canvas-mock/lib/window';

// const apis = [
//   'Path2D',
//   'CanvasGradient',
//   'CanvasPattern',
//   'CanvasRenderingContext2D',
//   'DOMMatrix',
//   'ImageData',
//   'TextMetrics',
//   'ImageBitmap',
//   'createImageBitmap',
// ] as const;

// const canvasWindow = getCanvasWindow({ document: window.document });

// apis.forEach((api) => {
//   global[api] = canvasWindow[api];
//   global.window[api] = canvasWindow[api];
// });

// afterAll(() => {
//   delete global.jest;
//   // @ts-expect-error: type
//   delete global.window.jest;
// });
