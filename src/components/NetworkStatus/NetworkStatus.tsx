import React from 'react';

import BlockHeightIcon from '@/components/icons/blockHeight';
import BlockTimeIcon from '@/components/icons/blockTIme';
import TransactionSpeedIcon from '@/components/icons/transactionSpeed';
import Card from '@/components/Main/card/Card';
import NetworkStatusSection from '@/components/NetworkStatus/NetworkStatusSection';
import Pulse from '@/components/Pulse/Pulse';
import { useAppSelector } from '@/redux/hooks';
import { selectData } from '@/redux/slices/data';
import styles from '@/styles/home/networkStatus.module.scss';

export default function NetworkStatus() {
  const { networkStatus } = useAppSelector(selectData);

  return (
    <Card className={styles.container}>
      <Pulse className={styles.pulse} />
      <NetworkStatusSection
        icon={<BlockHeightIcon />}
        label="Block Height"
        value={networkStatus.blockHeight}
      />
      <NetworkStatusSection
        icon={<BlockTimeIcon />}
        label="Block Time"
        value={`${networkStatus.blockTime}s`}
      />
      <NetworkStatusSection
        icon={<TransactionSpeedIcon />}
        label="TPS"
        value={networkStatus.tps.toFixed(2)}
      />
    </Card>
  );
}
