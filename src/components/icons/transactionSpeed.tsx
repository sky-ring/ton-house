import type { ImageProps } from 'next/image';
import Image from 'next/image';
import React from 'react';

import TransactionSpeed from '@/public/assets/images/tps.png';

export default function TransactionSpeedIcon(props: Partial<ImageProps>) {
  return (
    <Image
      src={TransactionSpeed}
      alt="Transaction Speed"
      width={28}
      height={28}
      {...props}
    />
  );
}
