import cn from 'classnames';
import React from 'react';

import styles from '@/styles/main/header.module.scss';

import type { Tab } from './Header.types';

const TABS: Tab[] = [
  'Home',
  'Validators',
  'Transactions',
  'Blocks',
  'Tokens',
  'Supply',
];

type TabProps = {
  title: Tab;
  selected: boolean;
};

function TabItem({ title, selected }: TabProps) {
  return (
    <a
      // @ts-ignore
      className={cn({ [styles.tab]: true, [styles.tabSelected]: selected })}
      role="tab"
      href={`/${title !== TABS[0] ? title.toLowerCase() : ''}`}
      target="_self"
    >
      {title}
    </a>
  );
}

type TabsProps = {
  selected: Tab;
};

export default function Tabs({ selected }: TabsProps) {
  return (
    <div className={styles.tabs}>
      {TABS.map((tab) => (
        <TabItem key={tab} title={tab} selected={selected === tab} />
      ))}
    </div>
  );
}
