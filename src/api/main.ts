import { get } from '.';

export const getRecentTransactions = async () => {
  const { data } = await get('transactions/recent');
  return data;
};
