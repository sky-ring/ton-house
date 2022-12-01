import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import {
  getRecentTransactions,
  getRecentValidatorsInfo,
  recentTransactionsListener,
  recentValidatorsInfoListener,
} from '@/api/main';
import { useSubscribeSocket } from '@/api/socket';
import TransactionsTable from '@/components/TransactionsTable/TransactionsTable';
import type { Transaction } from '@/components/TransactionsTable/types';
import TotalValidatorsChart from '@/components/ValidatorsInfo/TotalValidatorsChart';
import TotalWeightChart from '@/components/ValidatorsInfo/TotalWeightChart';
import type { ValidatorsInfoT } from '@/components/ValidatorsInfo/types';
import { Meta } from '@/layouts/Meta';
import { useAppDispatch } from '@/redux/hooks';
import { setTransactions, setValidatorsInfo } from '@/redux/slices/data';
import styles from '@/styles/home/index.module.scss';
import { Main } from '@/templates/Main';

type IndexProps = {
  recentTransactions: Transaction[];
  recentValidatorsInfo: ValidatorsInfoT[];
};

const Index = (props: IndexProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTransactions(props.recentTransactions));
    dispatch(setValidatorsInfo(props.recentValidatorsInfo));
  }, []);

  useSubscribeSocket('transactions', [recentTransactionsListener]);
  useSubscribeSocket('validators', [recentValidatorsInfoListener]);

  return (
    <Main meta={<Meta />} selectedTab="Home" className={styles.wrapper}>
      <TotalWeightChart />
      <TotalValidatorsChart />
      <TransactionsTable />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const recentTransactions = await getRecentTransactions(20);
  const recentValidatorsInfo = await getRecentValidatorsInfo();

  return {
    props: {
      recentTransactions,
      recentValidatorsInfo,
    },
  };
};

export default Index;
