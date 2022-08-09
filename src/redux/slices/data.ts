import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Transaction } from '@/components/Home/transactions/types';

import type { RootState } from '../store';

export type DataState = {
  transactions: Transaction[];
};

const initialState: DataState = {
  transactions: [],
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

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addTransaction: handleAddTransaction,
    setTransactions: handleSetTransactions,
  },
});

export const { addTransaction, setTransactions } = dataSlice.actions;

export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
