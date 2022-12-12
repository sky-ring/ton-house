export type Validator = {
  _id: string;
  address: string;
  publicKey: string;
  weight: string;
};

export type ValidatorsInfo = {
  _id: string;
  timeSince: number;
  timeUntill: number;
  total: number;
  main: number;
  totalWeight: string;
  validators: string[] | Validator[];
  createdAt: Date;
};
