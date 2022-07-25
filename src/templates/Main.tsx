import type { ReactNode } from 'react';

import Footer from '@/components/Main/footer/Footer';
import Header from '@/components/Main/header/Header';
import type { Tab } from '@/components/Main/header/Header.types';
import styles from '@/styles/main/main.module.scss';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  selectedTab: Tab;
};

const Main = (props: IMainProps) => (
  <div className="w-full antialiased">
    {props.meta}
    <Header tab={props.selectedTab} />
    <div className="mx-auto max-w-full sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg">
      <div className={styles.content}>{props.children}</div>
      <Footer />
    </div>
  </div>
);

export { Main };
