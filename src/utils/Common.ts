export const CLOCK_TICKS = Array.from(Array(12)).map((_, c) => `${c * 2}:00`);

const appendZero = (number: number) => {
  return `0${number}`.slice(-2);
};

export const timestampToHour = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${appendZero(date.getHours())}:${appendZero(date.getMinutes())}`;
};
