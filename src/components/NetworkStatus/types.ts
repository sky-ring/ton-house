import type React from 'react';

export type NetworkStatusSectionProps = {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
};

export type NetworkStatus = {
  blockHeight: number;
  blockTime: number;
  tps: number;
  blocksCount: number;
};
