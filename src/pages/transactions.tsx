import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { getRecentTransactions, recentTransactionsListener } from '@/api/main';
import { useSubscribeSocket } from '@/api/socket';
import TransactionsTable from '@/components/TransactionsTable/TransactionsTable';
import type { Transaction } from '@/components/TransactionsTable/types';
import { Meta } from '@/layouts/Meta';
import { useAppDispatch } from '@/redux/hooks';
import { setTransactions } from '@/redux/slices/data';
import styles from '@/styles/home/index.module.scss';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

type TransactionsPageProps = {
  recentTransactions: Transaction[];
};

const TransactionsPage = (props: TransactionsPageProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTransactions(props.recentTransactions));
  }, []);

  useSubscribeSocket('transactions', [recentTransactionsListener]);

  return (
    <Main
      meta={
        <Meta
          title="TON Status | Transactions"
          description={AppConfig.description}
        />
      }
      selectedTab="Transactions"
      className={styles.wrapper}
    >
      <TransactionsTable />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const recentTransactions = await getRecentTransactions(50);

  return {
    props: {
      recentTransactions,
    },
  };
};

export default TransactionsPage;
