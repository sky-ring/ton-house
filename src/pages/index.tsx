import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { getRecentTransactions, recentTransactionsListener } from '@/api/main';
import { useSubscribeSocket } from '@/api/socket';
import Transactions from '@/components/Home/transactions/Transactions';
import type { Transaction } from '@/components/Home/transactions/types';
import { Meta } from '@/layouts/Meta';
import { useAppDispatch } from '@/redux/hooks';
import { setTransactions } from '@/redux/slices/data';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

type IndexProps = {
  recentTransactions: Transaction[];
};
const Index = (props: IndexProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTransactions(props.recentTransactions));
  }, []);

  useSubscribeSocket('transactions', [recentTransactionsListener]);

  return (
    <Main
      meta={<Meta title="TON Status" description={AppConfig.description} />}
      selectedTab="Home"
    >
      <Transactions />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const recentTransactions = await getRecentTransactions();
  return {
    props: {
      recentTransactions,
    },
  };
};

export default Index;
