import React from 'react';

import Card from '@/components/Main/card/Card';
import Table from '@/components/Main/table/Table';
import { useAppSelector } from '@/redux/hooks';
import { selectData } from '@/redux/slices/data';
import styles from '@/styles/home/transactions.module.scss';

const formatValue = (hash: string) =>
  `${hash.slice(0, 6)}...${hash.slice(-6, -1)}`;

export default function BlocksTable() {
  const { blocks } = useAppSelector(selectData);

  return (
    <Card className={styles.container}>
      <h3>Recent Blocks</h3>
      <Table
        className={styles.table}
        enterAnimated
        keyField="root_hash"
        columns={{
          root_hash: { title: 'HASH', format: formatValue },
          seqno: { title: 'SEQUENCE NO.' },
          shard: { title: 'SHARD', format: formatValue },
          transactionsCount: { title: 'TRANSACTIONS #' },
        }}
        data={blocks}
      />
    </Card>
  );
}
