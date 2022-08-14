import React from 'react';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import Card from '@/components/Main/card/Card';
import { useAppSelector } from '@/redux/hooks';
import { selectData } from '@/redux/slices/data';
import styles from '@/styles/home/validatorsInfo.module.scss';

export default function TotalWeightChart() {
  const { validatorsInfo } = useAppSelector(selectData);
  return (
    <Card className={styles.container}>
      <ResponsiveContainer>
        <LineChart data={validatorsInfo}>
          <XAxis dataKey="created" />
          <Tooltip />
          <Line dataKey="totalWeight" type="monotone" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}
