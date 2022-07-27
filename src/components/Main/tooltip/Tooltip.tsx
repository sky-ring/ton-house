import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import Info from '@/components/icons/info';
import styles from '@/styles/main/tooltip.module.scss';

type TooltipProps = {
  text: string;
};

export default function Tooltip(props: TooltipProps) {
  const [shown, setShown] = useState(false);

  const handleMouseEnter = () => setShown(true);
  const handleMouseLeave = () => setShown(false);

  return (
    <span
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Info />
      <CSSTransition
        in={shown}
        timeout={200}
        classNames={{
          enter: styles.enter,
          enterActive: styles.enterActive,
          exit: styles.exit,
          exitActive: styles.exitActive,
        }}
        unmountOnExit
      >
        <p className={styles.info}>{props.text}</p>
      </CSSTransition>
    </span>
  );
}
