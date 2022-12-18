import type { ImageProps } from 'next/image';
import Image from 'next/image';
import React from 'react';

import BlockHeight from '@/public/assets/images/block-height.png';

export default function BlockHeightIcon(props: Partial<ImageProps>) {
  return (
    <Image
      src={BlockHeight}
      alt="Block Height"
      width={28}
      height={28}
      {...props}
    />
  );
}
