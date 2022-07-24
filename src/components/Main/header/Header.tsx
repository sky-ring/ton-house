import Link from 'next/link';
import React from 'react';

import styles from '@/styles/main/header.module.scss';
import { AppConfig } from '@/utils/AppConfig';

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <header className={styles.header}>
        <h2>{AppConfig.title}</h2>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </header>
    </div>
  );
}
