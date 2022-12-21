import React from 'react';

import Card from '@/components/Main/card/Card';
import Table from '@/components/Main/table/Table';
import { useAppSelector } from '@/redux/hooks';
import { selectData } from '@/redux/slices/data';
import styles from '@/styles/validators/validators.module.scss';

import type { Validator } from '../ValidatorsInfo/types';

const formatValue = (hash: string) =>
  `${hash.slice(0, 6)}…${hash.slice(-6, -1)}`;

const formatDate = (value: string | number) => {
  const date = new Date(value).toLocaleString();
  return date;
};

export default function ValidatorsInfoTable() {
  const { latestValidatorsInfo } = useAppSelector(selectData);

  return (
    <Card className={styles.tableContainer}>
      <h3>Latest Validators</h3>
      {latestValidatorsInfo ? (
        <>
          <div className={styles.validatorsInfo}>
            <span>
              Main: {latestValidatorsInfo.main} Total:{' '}
              {latestValidatorsInfo.total}
            </span>
            <span>Total Weight: {latestValidatorsInfo.totalWeight}</span>
            <span>
              {formatDate(latestValidatorsInfo.timeSince * 1000)} -{' '}
              {formatDate(latestValidatorsInfo.timeUntill * 1000)}
            </span>
          </div>
          <Table
            className={styles.table}
            enterAnimated
            keyField="_id"
            columns={{
              address: {
                title: 'ADDRESS',
                format: formatValue,
                tooltip: true,
              },
              publicKey: {
                title: 'PUBLIC KEY',
                format: formatValue,
                tooltip: true,
              },
              weight: {
                title: 'WEIGHT',
              },
            }}
            data={latestValidatorsInfo.validators as Validator[]}
          />
        </>
      ) : null}
    </Card>
  );
}
