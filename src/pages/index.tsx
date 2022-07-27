import Transactions from '@/components/Home/transactions/Transactions';
import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  return (
    <Main
      meta={<Meta title="TON Status" description={AppConfig.description} />}
      selectedTab="Home"
    >
      <Transactions />
    </Main>
  );
};

export default Index;
