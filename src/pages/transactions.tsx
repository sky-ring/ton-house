import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { getTransactions, transactionsListener } from '@/api/main';
import { useSubscribeSocket } from '@/api/socket';
import TransactionsTable from '@/components/TransactionsTable/TransactionsTable';
import type { Transaction } from '@/components/TransactionsTable/types';
import { Meta } from '@/layouts/Meta';
import { useAppDispatch } from '@/redux/hooks';
import { setTransactions } from '@/redux/slices/data';
import styles from '@/styles/home/index.module.scss';
import { Main } from '@/templates/Main';

type TransactionsPageProps = {
  recentTransactions: Transaction[];
};

const TransactionsPage = (props: TransactionsPageProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTransactions(props.recentTransactions));
  }, []);

  useSubscribeSocket([transactionsListener]);

  return (
    <Main
      meta={<Meta title="Transactions" />}
      selectedTab="Transactions"
      className={styles.wrapper}
    >
      <TransactionsTable />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const recentTransactions = await getTransactions(50);

  return {
    props: {
      recentTransactions,
    },
  };
};

export default TransactionsPage;
