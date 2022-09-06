import type { Transaction } from '../TransactionsTable/types';

export type BlockT = {
  workchain: number;
  shard: string;
  seqno: number;
  root_hash: string;
  file_hash: string;
  transactionsCount: number;
};

export type BlockInfoT = BlockT & {
  transactions: Transaction[];
};
