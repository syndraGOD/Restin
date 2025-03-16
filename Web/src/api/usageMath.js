export const TotalPriceMath = (b, c) => {
  b = parseInt(b);
  c = parseInt(c);
  const result = b + b * 0.5 * Math.max(0, Math.ceil((c - 10) / 5));
  return result;
};
