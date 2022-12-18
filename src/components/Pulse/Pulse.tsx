import cn from 'classnames';

import styles from '@/styles/main/pulse.module.scss';

type PulseProps = {
  className?: any;
};

export default function Pulse(props: PulseProps) {
  return (
    <div
      className={cn({
        // @ts-ignore
        [styles.pulse]: true,
        [props.className]: !!props.className,
      })}
    />
  );
}
