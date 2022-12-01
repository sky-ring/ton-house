import type { ImageProps } from 'next/image';
import Image from 'next/image';
import React from 'react';

import LogoImage from '@/public/assets/images/logo.png';
import { AppConfig } from '@/utils/AppConfig';

export default function Logo(props: Partial<ImageProps>) {
  return <Image src={LogoImage} alt={AppConfig.title} {...props} />;
}
