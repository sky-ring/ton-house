import type { GetServerSideProps } from 'next';
import { useEffect } from 'react';

import {
  getRecentValidatorsInfo,
  recentValidatorsInfoListener,
} from '@/api/main';
import { useSubscribeSocket } from '@/api/socket';
import TotalValidatorsChart from '@/components/ValidatorsInfo/TotalValidatorsChart';
import TotalWeightChart from '@/components/ValidatorsInfo/TotalWeightChart';
import type { ValidatorsInfoT } from '@/components/ValidatorsInfo/types';
import { Meta } from '@/layouts/Meta';
import { useAppDispatch } from '@/redux/hooks';
import { setValidatorsInfo } from '@/redux/slices/data';
import styles from '@/styles/validators/validators.module.scss';
import { Main } from '@/templates/Main';

type ValidatorsProps = {
  recentValidatorsInfo: ValidatorsInfoT[];
};

const Validators = (props: ValidatorsProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setValidatorsInfo(props.recentValidatorsInfo));
  }, []);

  useSubscribeSocket('validators', [recentValidatorsInfoListener]);

  return (
    <Main
      meta={<Meta title="Validators" />}
      selectedTab="Validators"
      className={styles.wrapper}
    >
      <TotalWeightChart />
      <TotalValidatorsChart />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const recentValidatorsInfo = await getRecentValidatorsInfo();

  return {
    props: {
      recentValidatorsInfo,
    },
  };
};

export default Validators;
