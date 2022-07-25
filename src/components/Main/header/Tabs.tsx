import cn from 'classnames';
import React from 'react';
import { CSSTransition } from 'react-transition-group';

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

export function TabItem({ title, selected }: TabProps) {
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

export function Tabs({ selected }: TabsProps) {
  return (
    <div className={styles.tabs}>
      {TABS.map((tab) => (
        <TabItem key={tab} title={tab} selected={selected === tab} />
      ))}
    </div>
  );
}

type HeaderTabsProps = {
  menuOpen: boolean;
  tab: Tab;
};

export default function HeaderTabs(props: HeaderTabsProps) {
  return (
    <>
      <div className={styles.headerMenu}>
        <CSSTransition
          in={props.menuOpen}
          timeout={200}
          classNames={{
            enter: styles.menuEnter,
            enterActive: styles.menuEnterActive,
            exit: styles.menuExit,
            exitActive: styles.menuExitActive,
          }}
          unmountOnExit
        >
          <Tabs selected={props.tab} />
        </CSSTransition>
      </div>
      <div className={styles.headerTab}>
        <Tabs selected={props.tab} />
      </div>
    </>
  );
}
