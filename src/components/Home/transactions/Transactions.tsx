import React from 'react';

import Card from '@/components/Main/card/Card';
import Table from '@/components/Main/table/Table';
import styles from '@/styles/home/transactions.module.scss';

import type { Transaction } from './types';

export type TransactionsProps = {
  transactions: Transaction[];
};

const formatValue = (hash: string) =>
  `${hash.slice(0, 6)}...${hash.slice(-6, -1)}`;

export default function Transactions(props: TransactionsProps) {
  return (
    <Card className={styles.container}>
      <h3>Recent Transactions</h3>
      <Table
        className={styles.table}
        columns={{
          hash: { title: 'HASH', format: formatValue },
          account: {
            title: 'ACCOUNT',
            info: 'some info about the account',
            format: formatValue,
          },
          lt: { title: 'LT' },
        }}
        data={props.transactions}
      />
    </Card>
  );
}
