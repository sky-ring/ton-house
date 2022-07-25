import Link from 'next/link';
import React, { useState } from 'react';

import MenuIcon from '@/components/icons/menu';
import styles from '@/styles/main/header.module.scss';
import { AppConfig } from '@/utils/AppConfig';

import type { Tab } from './Header.types';
import HeaderTabs from './Tabs';

type MenuButtonProps = {
  onClick?: () => void;
};

const MenuButton = (props: MenuButtonProps) => (
  <div className={styles.menuButton} onClick={props.onClick}>
    <MenuIcon />
  </div>
);

type HeaderProps = {
  tab: Tab;
};

export default function Header({ tab }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuClick = () => setMenuOpen((p) => !p);

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

          <MenuButton onClick={handleMenuClick} />
        </div>
        <HeaderTabs menuOpen={menuOpen} tab={tab} />
      </header>
    </div>
  );
}
