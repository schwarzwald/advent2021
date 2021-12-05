const id = (x, y) => `${x}#${y}`;
module.exports = input => [...input.split('\n')
  .map(c => /(\d+),(\d+) -> (\d+),(\d+)/.exec(c))
  .map(([_, x1, y1, x2, y2]) => [x1, y1, x2, y2].map(Number))
  .filter(([x1, y1, x2, y2]) => x1 == x2 || y1 == y2)
  .reduce((points, [x1, y1, x2, y2]) => {
    let dx = x1 == x2 ? 0 : (x1 < x2 ? 1 : -1);
    let dy = y1 == y2 ? 0 : (y1 < y2 ? 1 : -1);

    do {
      let key = id(x1, y1);
      points.set(key, (points.get(key) || 0) + 1);

      x1 += dx;
      y1 += dy;
    } while (x1 - dx != x2 || y1 - dy != y2);

    return points;
  }, new Map()).values()]
  .filter(c => c > 1).length;