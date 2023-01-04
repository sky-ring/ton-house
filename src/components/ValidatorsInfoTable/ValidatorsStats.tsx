import React from 'react';

import styles from '@/styles/validators/validators.module.scss';

import type { ValidatorsInfo } from '../ValidatorsInfo/types';

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

type ValidatorsInfoProps = {
  data: ValidatorsInfo;
};

const formatDate = (value: string | number) => {
  const date = new Date(value).toLocaleString();
  return date;
};

export default function ValidatorsStats(props: ValidatorsInfoProps) {
  return (
    <div className={styles.validatorsInfo}>
      <StatItem title="TOTAL WEIGHT" value={props.data.totalWeight} />
      <StatItem title="TOTAL VALIDATORS" value={props.data.total} />
      <StatItem title="SINCE" value={formatDate(props.data.timeSince * 1000)} />
      <StatItem
        title="UNTILL"
        value={formatDate(props.data.timeUntill * 1000)}
      />
    </div>
  );
}
