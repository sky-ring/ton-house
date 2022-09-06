import React from 'react';

import Card from '@/components/Main/card/Card';
import Table from '@/components/Main/table/Table';
import { useAppSelector } from '@/redux/hooks';
import { selectData } from '@/redux/slices/data';
import styles from '@/styles/home/transactions.module.scss';

const formatValue = (hash: string) =>
  `${hash.slice(0, 6)}...${hash.slice(-6, -1)}`;

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
          hash: { title: 'HASH', format: formatValue },
          account: {
            title: 'ACCOUNT',
            info: 'some info about the account',
            format: formatValue,
          },
          lt: { title: 'LT' },
        }}
        data={transactions}
      />
    </Card>
  );
}
