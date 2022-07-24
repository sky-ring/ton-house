import { useRouter } from 'next/router';

import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import { AppConfig } from '@/utils/AppConfig';

const Index = () => {
  const router = useRouter();

  return (
    <Main
      meta={<Meta title="TON Status" description={AppConfig.description} />}
    >
      <h1 className="text-2xl font-bold">
        Boilerplate code for your Nextjs project with Tailwind CSS
      </h1>
      <p>
        Check our GitHub project for more information about{' '}
        <a href="https://github.com/ixartz/Next-js-Boilerplate">
          Nextjs Boilerplate
        </a>
        . You can also browse our{' '}
        <a href="https://creativedesignsguru.com/category/nextjs/">
          Premium NextJS Templates
        </a>{' '}
        on our website to support this project.
      </p>
    </Main>
  );
};

export default Index;
