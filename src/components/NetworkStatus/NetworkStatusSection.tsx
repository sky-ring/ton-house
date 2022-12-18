import React from 'react';

import styles from '@/styles/home/networkStatus.module.scss';

import type { NetworkStatusSectionProps } from './types';

export default function NetworkStatusSection(props: NetworkStatusSectionProps) {
  return (
    <div className={styles.section}>
      {props.icon}
      <span>
        <b>{props.label}</b>
        <em>{props.value}</em>
      </span>
    </div>
  );
}
