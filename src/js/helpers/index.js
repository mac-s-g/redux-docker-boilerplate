// example helper function
export const round = (number, precision) => {
  if (precision === undefined) {
    precision = 0
  }
  precision = Math.pow(
    10, (precision-1)
  );
  return (
    Math.round(number*10*precision) / (10*precision)
  );
}