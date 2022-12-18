import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import {
  getNetworkStatus,
  getTransactions,
  getValidatorsInfoChart,
  networkStatusListener,
  transactionsListener,
} from '@/api/main';
import { useSubscribeSocket } from '@/api/socket';
import NetworkStatus from '@/components/NetworkStatus/NetworkStatus';
import type { NetworkStatus as NetworkStatusType } from '@/components/NetworkStatus/types';
import TransactionsTable from '@/components/TransactionsTable/TransactionsTable';
import type { Transaction } from '@/components/TransactionsTable/types';
import TotalValidatorsChart from '@/components/ValidatorsInfo/TotalValidatorsChart';
import TotalWeightChart from '@/components/ValidatorsInfo/TotalWeightChart';
import type { ValidatorsInfoChart } from '@/components/ValidatorsInfo/types';
import { Meta } from '@/layouts/Meta';
import { useAppDispatch } from '@/redux/hooks';
import {
  setNetworkStatus,
  setTransactions,
  setValidatorsInfoChart,
} from '@/redux/slices/data';
import styles from '@/styles/home/index.module.scss';
import { Main } from '@/templates/Main';

type IndexProps = {
  transactions: Transaction[];
  validatorsInfoChart: ValidatorsInfoChart[];
  networkStatus: NetworkStatusType;
};

const Index = (props: IndexProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setTransactions(props.transactions));
    dispatch(setValidatorsInfoChart(props.validatorsInfoChart));
    dispatch(setNetworkStatus(props.networkStatus));
  }, []);

  useSubscribeSocket([transactionsListener, networkStatusListener]);

  return (
    <Main meta={<Meta />} selectedTab="Home" className={styles.wrapper}>
      <NetworkStatus />
      <TotalWeightChart />
      <TotalValidatorsChart />
      <TransactionsTable />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const transactions = await getTransactions(20);
  const validatorsInfoChart = await getValidatorsInfoChart();
  const networkStatus = await getNetworkStatus();

  return {
    props: {
      transactions,
      validatorsInfoChart,
      networkStatus,
    },
  };
};

export default Index;
