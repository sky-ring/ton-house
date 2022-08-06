import type { GetServerSideProps } from 'next';

import { getRecentTransactions } from '@/api/main';
import Transactions from '@/components/Home/transactions/Transactions';
import type { Transaction } from '@/components/Home/transactions/types';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

type IndexProps = {
  recentTransactions: Transaction[];
};
const Index = (props: IndexProps) => {
  return (
    <Main
      meta={<Meta title="TON Status" description={AppConfig.description} />}
      selectedTab="Home"
    >
      <Transactions transactions={props.recentTransactions} />
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
