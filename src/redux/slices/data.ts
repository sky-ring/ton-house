import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Block } from '@/components/Blocks/types';
import type { Transaction } from '@/components/TransactionsTable/types';
import type { ValidatorsInfo } from '@/components/ValidatorsInfo/types';

import type { RootState } from '../store';

export type DataState = {
  transactions: Transaction[];
  validatorsInfo: ValidatorsInfo[];
  blocks: Block[];
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

const handleAddTransactions = (
  state: DataState,
  { payload }: PayloadAction<Transaction[]>
) => {
  state.transactions.splice(-payload.length, payload.length);
  state.transactions.unshift(...payload);
};

const handleSetValidatorsInfo = (
  state: DataState,
  { payload }: PayloadAction<ValidatorsInfo[]>
) => {
  state.validatorsInfo.splice(0, state.validatorsInfo.length);
  state.validatorsInfo.push(...payload);
};

const handleAddValidatorsInfo = (
  state: DataState,
  { payload }: PayloadAction<ValidatorsInfo>
) => {
  state.validatorsInfo.pop();
  state.validatorsInfo.unshift(payload);
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
    addValidatorsInfo: handleAddValidatorsInfo,
    setValidatorsInfo: handleSetValidatorsInfo,
    setBlocks: handleSetBlocks,
    addBlock: handleAddBlock,
  },
});

export const {
  addTransactions,
  setTransactions,
  addValidatorsInfo,
  setValidatorsInfo,
  addBlock,
  setBlocks,
} = dataSlice.actions;

export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
