import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import Card from '@/components/Main/card/Card';
import ChartTooltip from '@/components/Main/charts/Tooltip';
import { useAppSelector } from '@/redux/hooks';
import { selectData } from '@/redux/slices/data';
import styles from '@/styles/home/validatorsInfo.module.scss';
import { timestampToHour } from '@/utils/Common';
import { COLORS } from '@/utils/Constants';

import type { ValidatorsInfo } from './types';

const formatLabel = (payload: ValidatorsInfo) => {
  return (
    <>
      Total: {payload.total}
      <br />
      Total Weight: {payload.totalWeight}
      <br />
      <em>{new Date(payload.createdAt).toISOString()}</em>
    </>
  );
};

export default function TotalValidatorsChart() {
  const { validatorsInfo } = useAppSelector(selectData);
  return (
    <Card className={styles.container}>
      <ResponsiveContainer>
        <AreaChart data={validatorsInfo}>
          <XAxis
            dataKey="createdAt"
            tickFormatter={timestampToHour}
            tickLine={false}
            minTickGap={10}
          />
          <Tooltip content={<ChartTooltip />} formatter={formatLabel} />
          <Area
            dataKey="total"
            type="monotone"
            fill={COLORS.primaryDarkColor}
            stroke={COLORS.secondaryColor}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
