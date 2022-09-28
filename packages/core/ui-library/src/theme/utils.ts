const Left = (value) => `inset var(--hairline-width) 0 0 ${value}`;
const Top = (value) => `inset 0 var(--hairline-width) 0 ${value}`;
const Right = (value) => `inset calc(-1 * var(--hairline-width)) 0 0 ${value}`;
const Bottom = (value) => `inset 0 calc(-1 * var(--hairline-width)) 0 0 ${value}`;

export const utils = {
  hairlineL: (value) => ({
    // boxShadow: `inset var(--hairline-width) 0 0 ${value}`,
    boxShadow: `${Left(value)}`,
  }),
  hairlineT: (value) => ({
    // boxShadow: `inset 0 var(--hairline-width) 0 ${value}`,
    boxShadow: `${Top(value)}`,
  }),
  hairlineR: (value) => ({
    // boxShadow: `inset calc(-1 * var(--hairline-width)) 0 0 ${value}`,
    boxShadow: `${Right(value)}`,
  }),
  hairlineB: (value) => ({
    // boxShadow: `inset 0 calc(-1 * var(--hairline-width)) 0 0 ${value}`,
    boxShadow: `${Bottom(value)}`,
  }),
  hairlineX: (value) => ({
    // boxShadow: `inset var(--hairline-width) 0 0 ${value}, inset calc(-1 * var(--hairline-width)) 0 0 ${value}`,
    boxShadow: `${Left(value)}, ${Right(value)}`,
  }),
  hairlineY: (value) => ({
    // boxShadow: `inset 0 var(--hairline-width) 0 ${value}, inset 0 calc(-1 * var(--hairline-width)) 0 0 ${value}`,
    boxShadow: `${Top(value)}, ${Bottom(value)}`,
  }),
  hairlineLRB: (value) => ({
    // boxShadow: `inset var(--hairline-width) 0 0 ${value}, inset calc(-1 * var(--hairline-width)) 0 0 ${value}`,
    boxShadow: `${Left(value)}, ${Right(value)}, ${Bottom(value)}`,
  }),
  hairlineTRB: (value) => ({
    // boxShadow: `inset var(--hairline-width) 0 0 ${value}, inset calc(-1 * var(--hairline-width)) 0 0 ${value}`,
    boxShadow: `${Top(value)}, ${Right(value)}, ${Bottom(value)}`,
  }),
  hairlineTR: (value) => ({
    // boxShadow: `inset var(--hairline-width) 0 0 ${value}, inset calc(-1 * var(--hairline-width)) 0 0 ${value}`,
    boxShadow: `${Top(value)}, ${Right(value)}`,
  }),
  hairlineAll: (value) => ({
    boxShadow: `${Left(value)}, ${Top(value)}, ${Right(value)}, ${Bottom(value)}`,
  }),
};
