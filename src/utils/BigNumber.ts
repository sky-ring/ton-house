import BigNumber from 'bignumber.js';

export const BNtoNumber = (value: string): number => {
  const bn = BigNumber(value, 16);
  return bn.toNumber();
};
