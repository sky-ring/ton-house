import type { ImageProps } from 'next/image';
import Image from 'next/image';
import React from 'react';

import BlockTime from '@/public/assets/images/block-time.png';

export default function BlockTimeIcon(props: Partial<ImageProps>) {
  return (
    <Image src={BlockTime} alt="Block Time" width={28} height={28} {...props} />
  );
}
