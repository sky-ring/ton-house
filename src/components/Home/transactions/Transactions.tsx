import React from 'react';

import Card from '@/components/Main/card/Card';
import Table from '@/components/Main/table/Table';
import styles from '@/styles/home/transactions.module.scss';

export default function Transactions() {
  return (
    <Card className={styles.container}>
      <h3>Recent Transactions</h3>
      <Table
        className={styles.table}
        columns={{
          slot: { title: 'SLOT' },
          validator: { title: 'VALIDATOR', info: 'some info' },
        }}
        data={[
          { slot: 23123123, validator: 'wdasdasd' },
          { slot: 23123123, validator: 'wdasdasd' },
        ]}
      />
    </Card>
  );
}
