const sum = (start, size) => start * size + (size - size * size) / 2;
const factorize = (number) => {
  let start = Math.ceil(number / 2);
  let factors = [[number, 1]];
  let i = 2;

  while (true) {
    if (sum(start, start) < number) {
      return factors;
    }

    let partial = sum(start, i);

    if (partial < number) {
      i++;
      continue;
    }

    if (partial == number) {
      factors.push([start, i]);
    }

    i = 2;
    start--;
  }
}

const id = (x, y) => 1000 * y + x;

module.exports = input => {
  let [xmin, xmax, ymin, ymax] = input.match(/target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)..(-?\d+)/).slice(1).map(Number);

  let result = new Set();
  let factors = [];

  for (let x = xmin; x <= xmax; x++) {
    factors.push(factorize(x));
  }

  for (let y = ymin; y <= ymax; y++) {
    let yfactors = factorize(-y).map(([start, size]) => [start - size + 1, size]);

    for (let xfactors of factors) {
      for (let [vx, tx] of xfactors) {
        for (let [vy, ty] of yfactors) {
          let tdual = ty + vy * 2 - 1;

          if (tx == ty) {
            result.add(id(vx, -vy));
          } else if (tx == tdual || (tx == vx && tx < tdual)) {
            result.add(id(vx, vy - 1));
          }
        }
      }
    }
  }

  return result.size;
}
