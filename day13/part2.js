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

  for ([axis, position] of folds) {
    let i = axis == 'y' ? 1 : 0;
    for (let point of points) {
      if (point[i] > position) {
        point[i] = 2 * position - point[i];
      }
    }
  }

  let width = Math.max(...points.map(([x, _]) => x)) + 1;
  let height = Math.max(...points.map(([_, y]) => y)) + 1;
  let grid = [...new Array(height)].map(_ => [...new Array(width)]);

  for ([x, y] of points) {
    grid[y][x] = 1;
  }

  return grid.map(row => row.map(c => c ? '#' : ' ').join('')).join('\n');
}
