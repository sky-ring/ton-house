import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import Card from '@/components/Main/card/Card';
import ChartTooltip from '@/components/Main/charts/Tooltip';
import { useAppSelector } from '@/redux/hooks';
import { selectData } from '@/redux/slices/data';
import styles from '@/styles/home/validatorsInfo.module.scss';
import { COLORS } from '@/utils/Constants';

import type { ValidatorsInfoChart } from './types';

const formatLabel = (payload: ValidatorsInfoChart) => {
  return (
    <>
      {payload.totalWeight}
      <br />
      <br />
      <small>
        <em>{payload.createdAt}</em>
      </small>
    </>
  );
};

export default function TotalWeightChart() {
  const { validatorsInfoChart } = useAppSelector(selectData);

  const tickFormatter = (tick: string): string => {
    const splitted = tick.split('-');
    return splitted[splitted.length - 1] || '';
  };

  return (
    <Card className={styles.container}>
      <h3>Total Weight</h3>
      <div className={styles.chartWrapper}>
        <ResponsiveContainer>
          <AreaChart data={validatorsInfoChart}>
            <XAxis dataKey="createdAt" tickLine tickFormatter={tickFormatter} />
            <Tooltip content={<ChartTooltip />} formatter={formatLabel} />
            <Area
              dataKey="totalWeight"
              type="monotone"
              fill={COLORS.primaryDarkColor}
              stroke={COLORS.secondaryColor}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
