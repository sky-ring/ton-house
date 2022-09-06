import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { BlockT } from '@/components/Blocks/types';
import type { Transaction } from '@/components/TransactionsTable/types';
import type { ValidatorsInfoT } from '@/components/ValidatorsInfo/types';

import type { RootState } from '../store';

export type DataState = {
  transactions: Transaction[];
  validatorsInfo: ValidatorsInfoT[];
  blocks: BlockT[];
};

const initialState: DataState = {
  transactions: [],
  validatorsInfo: [],
  blocks: [],
};

const handleSetTransactions = (
  state: DataState,
  { payload }: PayloadAction<Transaction[]>
) => {
  state.transactions.splice(0, state.transactions.length);
  state.transactions.push(...payload);
};

const handleAddTransaction = (
  state: DataState,
  { payload }: PayloadAction<Transaction>
) => {
  state.transactions.pop();
  state.transactions.unshift(payload);
};
const handleSetValidatorsInfo = (
  state: DataState,
  { payload }: PayloadAction<ValidatorsInfoT[]>
) => {
  state.validatorsInfo.splice(0, state.validatorsInfo.length);
  state.validatorsInfo.push(...payload);
};

const handleAddValidatorsInfo = (
  state: DataState,
  { payload }: PayloadAction<ValidatorsInfoT>
) => {
  state.validatorsInfo.pop();
  state.validatorsInfo.unshift(payload);
};

const handleSetBlocks = (
  state: DataState,
  { payload }: PayloadAction<BlockT[]>
) => {
  state.blocks.splice(0, state.blocks.length);
  state.blocks.push(...payload);
};

const handleAddBlock = (
  state: DataState,
  { payload }: PayloadAction<BlockT>
) => {
  const exists = state.blocks.findIndex(
    (block) => block.root_hash === payload.root_hash
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
    addTransaction: handleAddTransaction,
    setTransactions: handleSetTransactions,
    addValidatorsInfo: handleAddValidatorsInfo,
    setValidatorsInfo: handleSetValidatorsInfo,
    setBlocks: handleSetBlocks,
    addBlock: handleAddBlock,
  },
});

export const {
  addTransaction,
  setTransactions,
  addValidatorsInfo,
  setValidatorsInfo,
  addBlock,
  setBlocks,
} = dataSlice.actions;

export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
