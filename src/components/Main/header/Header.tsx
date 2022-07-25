import Link from 'next/link';
import React from 'react';

import styles from '@/styles/main/header.module.scss';
import { AppConfig } from '@/utils/AppConfig';

import type { Tab } from './Header.types';
import Tabs from './Tabs';

type HeaderProps = {
  tab: Tab;
};

export default function Header({ tab }: HeaderProps) {
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h2>{AppConfig.title}</h2>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        </div>
        <Tabs selected={tab} />
      </header>
    </div>
  );
}
