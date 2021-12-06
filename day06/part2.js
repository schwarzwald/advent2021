const cache = new Map();
const id = (s, d) => `${s}#${d}`;

const population = (start, days) => {
  if (days <= 0) {
    return 0;
  }

  let popId = id(start, days);
  if (cache.get(popId)) {
    return cache.get(popId);
  }

  let periods = Math.ceil((days - start) / 7);
  let sum = periods;

  for (let i = 0; i < periods; i++) {
    sum += population(6, days - start - 3 - 7 * i);
  }

  cache.set(popId, sum);
  return sum;
}

module.exports = input =>
  input.split(',')
    .map(Number)
    .map(f => 1 + population(f, 256))
    .reduce((sum, a) => sum + a);