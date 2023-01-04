import Link from 'next/link';
import React from 'react';

import Card from '@/components/Main/card/Card';
import Table from '@/components/Main/table/Table';
import { useAppSelector } from '@/redux/hooks';
import { selectData } from '@/redux/slices/data';
import styles from '@/styles/home/transactions.module.scss';

const formatHash = (hash: string) => (
  <Link passHref href={`https://tonscan.org/tx/${hash}`}>
    <a target="_blank">
      {hash.slice(0, 6)}…${hash.slice(-6, -1)}
    </a>
  </Link>
);

const formatAccount = (account: string) => (
  <Link passHref href={`https://tonscan.org/address/${account}`}>
    <a target="_blank">
      {account.slice(0, 6)}…${account.slice(-6, -1)}
    </a>
  </Link>
);

export default function TransactionsTable() {
  const { transactions } = useAppSelector(selectData);

  return (
    <Card className={styles.container}>
      <h3>Recent Transactions</h3>
      <Table
        className={styles.table}
        enterAnimated
        keyField="hash"
        columns={{
          hash: { title: 'HASH', format: formatHash, tooltip: true },
          account: {
            title: 'ACCOUNT',
            format: formatAccount,
            tooltip: true,
          },
          lt: { title: 'LOGICAL TIME' },
        }}
        data={transactions}
      />
    </Card>
  );
}
