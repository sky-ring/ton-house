import React from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

import Card from '@/components/Main/card/Card';
import ChartTooltip from '@/components/Main/charts/Tooltip';
import { useAppSelector } from '@/redux/hooks';
import { selectData } from '@/redux/slices/data';
import styles from '@/styles/home/validatorsInfo.module.scss';
import { timestampToHour } from '@/utils/Common';
import { COLORS } from '@/utils/Constants';

import type { ValidatorsInfoT } from './types';

const formatLabel = (payload: ValidatorsInfoT) => {
  return (
    <>
      Total Weight: {payload.totalWeight}
      <br />
      Total: {payload.total}
    </>
  );
};

export default function TotalWeightChart() {
  const { validatorsInfo } = useAppSelector(selectData);
  return (
    <Card className={styles.container}>
      <ResponsiveContainer>
        <AreaChart data={validatorsInfo}>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={COLORS.primaryDarkColor}
                stopOpacity={1}
              />
              <stop
                offset="95%"
                stopColor={COLORS.primaryColor}
                stopOpacity={0.8}
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="created"
            tickFormatter={timestampToHour}
            tickLine={false}
            minTickGap={10}
          />
          <Tooltip content={<ChartTooltip />} formatter={formatLabel} />
          <Area
            dataKey="totalWeight"
            type="monotone"
            fill="url(#grad)"
            stroke={COLORS.secondaryColor}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
}
