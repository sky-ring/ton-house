import type { Transaction } from '../TransactionsTable/types';

export type Block = {
  _id: string;
  workchain: number;
  shard: string;
  sequenceNumber: number;
  rootHash: string;
  fileHash: string;
  transactions: string[] | Transaction[];
};
