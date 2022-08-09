import type { Transaction } from '@/components/Home/transactions/types';
import { addTransaction } from '@/redux/slices/data';
import { store } from '@/redux/store';

import { get } from '.';
import type { Listener } from './socket';

export const getRecentTransactions = async () => {
  const { data } = await get('transactions/recent');
  return data;
};

export const recentTransactionsListener: Listener = {
  event: 'transaction',
  action: (dispatch, transaction: Transaction) => {
    if (
      !store
        .getState()
        .data.transactions.find((t) => t.hash === transaction.hash)
    ) {
      dispatch(addTransaction(transaction));
    }
  },
};
