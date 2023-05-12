export const money = (amount: number) => {
  if (amount === 0) return '-';

  return new Intl.NumberFormat('sr-RS', { maximumFractionDigits: 2 }).format(amount);
};
