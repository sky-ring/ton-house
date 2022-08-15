import React from 'react';
import type { TooltipProps } from 'recharts';
import type {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

import styles from '@/styles/main/chartstooltip.module.scss';

const ChartTooltip = ({
  active,
  payload,
  formatter,
}: TooltipProps<ValueType, NameType>) => {
  if (active) {
    return (
      <div className={styles.container}>
        <span>{formatter?.(payload ? payload[0]?.payload : {}) ?? ''}</span>
      </div>
    );
  }

  return null;
};

export default ChartTooltip;
