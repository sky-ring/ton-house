import type { Block } from '@/components/Blocks/types';
import type { Transaction } from '@/components/TransactionsTable/types';
import type { ValidatorsInfo } from '@/components/ValidatorsInfo/types';
import {
  addBlock,
  addTransactions,
  addValidatorsInfo,
} from '@/redux/slices/data';
import { BNtoNumber } from '@/utils/BigNumber';

import { get } from '.';
import type { Listener } from './socket';

export const getTransactions = async (limit?: number) => {
  const { data } = await get('transaction', { params: { limit } });
  return data;
};

export const transactionsListener: Listener = {
  event: 'transactions.inserted',
  action: (dispatch, transactions: Transaction[]) => {
    dispatch(addTransactions(transactions));
  },
};

export const getBlocks = async (limit?: number) => {
  const { data } = await get('block', { params: { limit } });
  return data;
};

export const blocksListener: Listener = {
  event: 'block.inserted',
  action: (dispatch, block: Block) => {
    dispatch(addBlock(block));
  },
};

export const getValidatorsInfo = async (
  limit?: number
): Promise<ValidatorsInfo[]> => {
  let { data } = await get('validators', {
    params: {
      limit,
    },
  });
  data = data.map((validatorsInfo: ValidatorsInfo) => {
    return {
      ...validatorsInfo,
      totalWeight: BNtoNumber(validatorsInfo.totalWeight).toString(), // + 1e18 * (Math.random() - 0.5),
    };
  });

  return data;
};

export const validatorsInfoListener: Listener = {
  event: 'validators.inserted',
  action: (dispatch, validatorsInfo: ValidatorsInfo) => {
    const totalWeight = BNtoNumber(validatorsInfo.totalWeight).toString();
    dispatch(
      addValidatorsInfo({
        ...validatorsInfo,
        totalWeight,
      })
    );
  },
};
