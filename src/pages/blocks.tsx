import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import { blocksListener, getBlocks } from '@/api/main';
import { useSubscribeSocket } from '@/api/socket';
import BlocksTable from '@/components/Blocks/BlocksTable';
import type { Block } from '@/components/Blocks/types';
import { Meta } from '@/layouts/Meta';
import { useAppDispatch } from '@/redux/hooks';
import { setBlocks } from '@/redux/slices/data';
import styles from '@/styles/home/index.module.scss';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

type BlocksPageProps = {
  recentBlocks: Block[];
};

const BlocksPage = (props: BlocksPageProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setBlocks(props.recentBlocks));
  }, []);

  useSubscribeSocket([blocksListener]);

  return (
    <Main
      meta={
        <Meta title="TON House | Blocks" description={AppConfig.description} />
      }
      selectedTab="Blocks"
      className={styles.wrapper}
    >
      <BlocksTable />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const recentBlocks = await getBlocks(30);

  return {
    props: {
      recentBlocks,
    },
  };
};

export default BlocksPage;
