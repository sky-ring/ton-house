import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Block } from '@/components/Blocks/types';
import type { NetworkStatus } from '@/components/NetworkStatus/types';
import type { Transaction } from '@/components/TransactionsTable/types';
import type {
  ValidatorsInfo,
  ValidatorsInfoChart,
} from '@/components/ValidatorsInfo/types';

import type { RootState } from '../store';

export type DataState = {
  transactions: Transaction[];
  latestValidatorsInfo?: ValidatorsInfo;
  validatorsInfoChart: ValidatorsInfoChart[];
  blocks: Block[];
  networkStatus: NetworkStatus;
};

const initialState: DataState = {
  transactions: [],
  validatorsInfoChart: [],
  blocks: [],
  networkStatus: {
    blockHeight: 0,
    blockTime: 0,
    tps: 0,
    blocksCount: 0,
  },
};

const handleSetTransactions = (
  state: DataState,
  { payload }: PayloadAction<Transaction[]>
) => {
  state.transactions.splice(0, state.transactions.length);
  state.transactions.push(...payload);
};

const handleAddTransactions = (
  state: DataState,
  { payload }: PayloadAction<Transaction[]>
) => {
  state.transactions.splice(-payload.length, payload.length);
  state.transactions.unshift(...payload);
};

const handleSetValidatorsInfoChart = (
  state: DataState,
  { payload }: PayloadAction<ValidatorsInfoChart[]>
) => {
  state.validatorsInfoChart.splice(0, state.validatorsInfoChart.length);
  state.validatorsInfoChart.push(...payload);
};

const handleSetLatestValidatorsInfo = (
  state: DataState,
  { payload }: PayloadAction<ValidatorsInfo>
) => {
  state.latestValidatorsInfo = payload;
};

const handleSetNetworkStatus = (
  state: DataState,
  { payload }: PayloadAction<NetworkStatus>
) => {
  Object.assign(state.networkStatus, payload);
};

const handleSetBlocks = (
  state: DataState,
  { payload }: PayloadAction<Block[]>
) => {
  state.blocks.splice(0, state.blocks.length);
  state.blocks.push(...payload);
};

const handleAddBlock = (
  state: DataState,
  { payload }: PayloadAction<Block>
) => {
  const exists = state.blocks.findIndex(
    (block) => block.rootHash === payload.rootHash
  );
  if (exists !== -1) {
    // already exists
    // replace with new
    state.blocks.splice(exists, 1, payload);
  } else {
    state.blocks.pop();
    state.blocks.unshift(payload);
  }
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addTransactions: handleAddTransactions,
    setTransactions: handleSetTransactions,
    setLatestValidatorsInfo: handleSetLatestValidatorsInfo,
    setValidatorsInfoChart: handleSetValidatorsInfoChart,
    setBlocks: handleSetBlocks,
    addBlock: handleAddBlock,
    setNetworkStatus: handleSetNetworkStatus,
  },
});

export const {
  addTransactions,
  setTransactions,
  setLatestValidatorsInfo,
  setValidatorsInfoChart,
  addBlock,
  setBlocks,
  setNetworkStatus,
} = dataSlice.actions;

export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
