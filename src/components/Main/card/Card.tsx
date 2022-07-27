import cn from 'classnames';
import React from 'react';

import styles from '@/styles/main/card.module.scss';

type CardProps = {
  children?: React.ReactNode;
  className?: any;
};

export default function Card(props: CardProps) {
  return (
    <div
      className={cn({
        // @ts-ignore
        [styles.card]: true,
        [props.className]: !!props.className,
      })}
    >
      {props.children}
    </div>
  );
}
