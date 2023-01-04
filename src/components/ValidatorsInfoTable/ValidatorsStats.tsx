import React from 'react';

import { useAppSelector } from '@/redux/hooks';
import { selectData } from '@/redux/slices/data';
import styles from '@/styles/validators/validators.module.scss';

import Card from '../Main/card/Card';

type ValidatorsInfoStatProp = {
  title: string;
  value: React.ReactNode;
};

function StatItem(props: ValidatorsInfoStatProp) {
  return (
    <div className={styles.stat}>
      <span className={styles.statTitle}>{props.title}</span>
      <span className={styles.statValue}>{props.value}</span>
    </div>
  );
}

const formatDate = (value: string | number) => {
  const date = new Date(value).toLocaleString();
  return date;
};

export default function ValidatorsStats() {
  const { latestValidatorsInfo } = useAppSelector(selectData);

  return latestValidatorsInfo ? (
    <Card className={styles.validatorsInfo}>
      <StatItem title="TOTAL WEIGHT" value={latestValidatorsInfo.totalWeight} />
      <StatItem title="TOTAL VALIDATORS" value={latestValidatorsInfo.total} />
      <StatItem
        title="SINCE"
        value={formatDate(latestValidatorsInfo.timeSince * 1000)}
      />
      <StatItem
        title="UNTILL"
        value={formatDate(latestValidatorsInfo.timeUntill * 1000)}
      />
    </Card>
  ) : null;
}
