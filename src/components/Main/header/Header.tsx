import React, { useState } from 'react';

import Logo from '@/components/icons/logo';
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
          <div className={styles.headerBrand}>
            <Logo objectFit="scale-down" width={80} height={80} />
            <span>
              <h2>{AppConfig.site_name}</h2>
              <h5>{AppConfig.description}</h5>
            </span>
          </div>

          <MenuButton onClick={handleMenuClick} />
        </div>
        <HeaderTabs menuOpen={menuOpen} tab={tab} />
      </header>
    </div>
  );
}
