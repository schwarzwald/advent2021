module.exports = input => {
  let points = [];
  let folds = [];

  for (let line of input.split('\n')) {
    if (line.includes(',')) {
      points.push(line.split(',').map(Number));
    } else if (line.includes('fold')) {
      folds.push(line.trim().substring(11).split('='));
    }
  }

  let i = folds[0][0] == 'y' ? 1 : 0;
  for (let point of points) {
    if (point[i] > folds[0][1]) {
      point[i] = 2 * folds[0][1] - point[i];
    }
  }

  return new Set(points.map(([x, y]) => `${x}#${y}`)).size;
}
