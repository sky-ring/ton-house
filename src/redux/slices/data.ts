import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { Transaction } from '@/components/Home/transactions/types';
import type { ValidatorsInfoT } from '@/components/Home/validatorsInfo/types';

import type { RootState } from '../store';

export type DataState = {
  transactions: Transaction[];
  validatorsInfo: ValidatorsInfoT[];
};

const initialState: DataState = {
  transactions: [],
  validatorsInfo: [],
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
  state.validatorsInfo.shift();
  state.validatorsInfo.push(payload);
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addTransaction: handleAddTransaction,
    setTransactions: handleSetTransactions,
    addValidatorsInfo: handleAddValidatorsInfo,
    setValidatorsInfo: handleSetValidatorsInfo,
  },
});

export const {
  addTransaction,
  setTransactions,
  addValidatorsInfo,
  setValidatorsInfo,
} = dataSlice.actions;

export const selectData = (state: RootState) => state.data;

export default dataSlice.reducer;
