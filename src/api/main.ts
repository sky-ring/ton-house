import type { Block } from '@/components/Blocks/types';
import type { NetworkStatus } from '@/components/NetworkStatus/types';
import type { Transaction } from '@/components/TransactionsTable/types';
import type {
  ValidatorsInfo,
  ValidatorsInfoChart,
} from '@/components/ValidatorsInfo/types';
import { TimeWindow } from '@/components/ValidatorsInfo/types';
import {
  addBlock,
  addTransactions,
  setLatestValidatorsInfo,
  setNetworkStatus,
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

export const getNetworkStatus = async (): Promise<NetworkStatus> => {
  const { data } = await get('status');
  return data;
};

export const networkStatusListener: Listener = {
  event: 'networkStatus.changed',
  action: (dispatch, networkStatus: NetworkStatus) => {
    dispatch(setNetworkStatus(networkStatus));
  },
};

export const getBlocks = async (limit?: number): Promise<Block[]> => {
  const { data } = await get('block', { params: { limit } });
  return data;
};

export const blocksListener: Listener = {
  event: 'block.inserted',
  action: (dispatch, block: Block) => {
    dispatch(addBlock(block));
  },
};

export const getValidatorsInfoChart = async (
  limit: number = 30,
  timeWindow: TimeWindow = TimeWindow.DAY
): Promise<ValidatorsInfoChart[]> => {
  const { data } = await get('validators/chart', {
    params: {
      limit,
      timeWindow,
    },
  });
  const result: ValidatorsInfoChart[] = data
    .map((validatorsInfoChart: ValidatorsInfoChart) => {
      return {
        createdAt: validatorsInfoChart.createdAt,
        total: validatorsInfoChart.total,
        totalWeight: BNtoNumber(validatorsInfoChart.totalWeight).toString(),
      } as ValidatorsInfoChart;
    })
    .reverse();
  return result;
};

export const getLatestValidatorsInfo = async (): Promise<ValidatorsInfo> => {
  let { data } = await get('validators/latest/populated');

  data = {
    ...data,
    totalWeight: BNtoNumber(data.totalWeight).toString(),
  };

  return data;
};

export const validatorsInfoListener: Listener = {
  event: 'validators.inserted',
  action: (dispatch, validatorsInfo: ValidatorsInfo) => {
    const totalWeight = BNtoNumber(validatorsInfo.totalWeight).toString();
    dispatch(
      setLatestValidatorsInfo({
        ...validatorsInfo,
        totalWeight,
      })
    );
  },
};
