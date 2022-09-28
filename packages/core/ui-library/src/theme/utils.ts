const Left = (value: string) => `inset var(--hairline-width) 0 0 ${value}`;
const Top = (value: string) => `inset 0 var(--hairline-width) 0 ${value}`;
const Right = (value: string) => `inset calc(-1 * var(--hairline-width)) 0 0 ${value}`;
const Bottom = (value: string) => `inset 0 calc(-1 * var(--hairline-width)) 0 0 ${value}`;

export const utils = {
  hairlineL: (value: string) => ({
    boxShadow: `${Left(value)}`,
  }),
  hairlineT: (value: string) => ({
    boxShadow: `${Top(value)}`,
  }),
  hairlineR: (value: string) => ({
    boxShadow: `${Right(value)}`,
  }),
  hairlineB: (value: string) => ({
    boxShadow: `${Bottom(value)}`,
  }),
  hairlineX: (value: string) => ({
    boxShadow: `${Left(value)}, ${Right(value)}`,
  }),
  hairlineY: (value: string) => ({
    boxShadow: `${Top(value)}, ${Bottom(value)}`,
  }),
  hairlineLRB: (value: string) => ({
    boxShadow: `${Left(value)}, ${Right(value)}, ${Bottom(value)}`,
  }),
  hairlineTRB: (value: string) => ({
    boxShadow: `${Top(value)}, ${Right(value)}, ${Bottom(value)}`,
  }),
  hairlineTR: (value: string) => ({
    boxShadow: `${Top(value)}, ${Right(value)}`,
  }),
  hairlineAll: (value: string) => ({
    boxShadow: `${Left(value)}, ${Top(value)}, ${Right(value)}, ${Bottom(value)}`,
  }),
};
