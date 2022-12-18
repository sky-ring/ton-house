import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useEffect } from 'react';

import { getLatestValidatorsInfo, getValidatorsInfoChart } from '@/api/main';
import TotalValidatorsChart from '@/components/ValidatorsInfo/TotalValidatorsChart';
import TotalWeightChart from '@/components/ValidatorsInfo/TotalWeightChart';
import type {
  ValidatorsInfo,
  ValidatorsInfoChart,
} from '@/components/ValidatorsInfo/types';
import { TimeWindow } from '@/components/ValidatorsInfo/types';
import ValidatorsInfoTable from '@/components/ValidatorsInfoTable/ValidatorsInfoTable';
import { Meta } from '@/layouts/Meta';
import { useAppDispatch } from '@/redux/hooks';
import {
  setLatestValidatorsInfo,
  setValidatorsInfoChart,
} from '@/redux/slices/data';
import styles from '@/styles/validators/validators.module.scss';
import { Main } from '@/templates/Main';

type ValidatorsProps = {
  validatorsInfoChart: ValidatorsInfoChart[];
  latestValidatorsInfo: ValidatorsInfo;
};

const Validators = (props: ValidatorsProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setValidatorsInfoChart(props.validatorsInfoChart));
    dispatch(setLatestValidatorsInfo(props.latestValidatorsInfo));
  }, []);

  // useSubscribeSocket([validatorsInfoListener]);

  return (
    <Main
      meta={<Meta title="Validators" />}
      selectedTab="Validators"
      className={styles.wrapper}
    >
      <TotalWeightChart />
      <TotalValidatorsChart />
      <ValidatorsInfoTable />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const limit = query.limit ? Number(query.limit) : undefined;

  const timeWindow =
    query.window !== undefined &&
    !Array.isArray(query.window) &&
    (Object.values(TimeWindow) as string[]).includes(query.window)
      ? (query.window as TimeWindow)
      : undefined;

  const validatorsInfoChart = await getValidatorsInfoChart(limit, timeWindow);
  const latestValidatorsInfo = await getLatestValidatorsInfo();

  return {
    props: {
      validatorsInfoChart,
      latestValidatorsInfo,
    },
  };
};

export default Validators;
