import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import {
  getRecentTransactions,
  getRecentValidatorsInfo,
  recentTransactionsListener,
  recentValidatorsInfoListener,
} from '@/api/main';
import { useSubscribeSocket } from '@/api/socket';
import Transactions from '@/components/Home/transactions/Transactions';
import type { Transaction } from '@/components/Home/transactions/types';
import TotalValidatorsChart from '@/components/Home/validatorsInfo/TotalValidatorsChart';
import TotalWeightChart from '@/components/Home/validatorsInfo/TotalWeightChart';
import type { ValidatorsInfoT } from '@/components/Home/validatorsInfo/types';
import { Meta } from '@/layouts/Meta';
import { useAppDispatch } from '@/redux/hooks';
import { setTransactions, setValidatorsInfo } from '@/redux/slices/data';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

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
    <Main
      meta={<Meta title="TON Status" description={AppConfig.description} />}
      selectedTab="Home"
    >
      <TotalWeightChart />
      <TotalValidatorsChart />
      <Transactions />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const recentTransactions = await getRecentTransactions();
  const recentValidatorsInfo = await getRecentValidatorsInfo();

  return {
    props: {
      recentTransactions,
      recentValidatorsInfo,
    },
  };
};

export default Index;
