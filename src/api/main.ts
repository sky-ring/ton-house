import type { Transaction } from '@/components/Home/transactions/types';
import type { ValidatorsInfoT } from '@/components/Home/validatorsInfo/types';
import { addTransaction, addValidatorsInfo } from '@/redux/slices/data';
import { store } from '@/redux/store';
import { BNtoNumber } from '@/utils/BigNumber';

import { get } from '.';
import type { Listener } from './socket';

export const getRecentTransactions = async (last?: number) => {
  const { data } = await get('transactions/recent', { params: { last } });
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

export const getRecentValidatorsInfo = async (): Promise<ValidatorsInfoT[]> => {
  let { data } = await get('validators', {
    params: {
      count: 50,
    },
  });
  data = data.map((validatorsInfo: any) => {
    return {
      ...validatorsInfo,
      totalWeight: BNtoNumber(validatorsInfo.totalWeight), // + 1e18 * (Math.random() - 0.5),
    };
  });

  return data;
};

export const recentValidatorsInfoListener: Listener = {
  event: 'validators_info',
  action: (dispatch, validatorsInfo: any) => {
    const totalWeight = BNtoNumber(validatorsInfo.totalWeight); // + 1e18 * (Math.random() - 0.5);
    dispatch(
      addValidatorsInfo({
        ...validatorsInfo,
        totalWeight,
      })
    );
  },
};
