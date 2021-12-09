const size = (map, lowpoint) => {
  let queue = [lowpoint];
  let visited = new Set();
  let size = 0;

  while (queue.length) {
    let [x, y] = queue.pop();
    let id = `${x}#${y}`;

    if (visited.has(id)) {
      continue;
    }

    visited.add(id);
    size++;

    if (x > 0 && map[y][x - 1] < 9) {
      queue.push([x - 1, y]);
    }
    if (x < map[y].length - 1 && map[y][x + 1] < 9) {
      queue.push([x + 1, y]);
    }
    if (y > 0 && map[y - 1][x] < 9) {
      queue.push([x, y - 1]);
    }
    if (y < map.length - 1 && map[y + 1][x] < 9) {
      queue.push([x, y + 1]);
    }

  }

  return size;
}

module.exports = input =>
  input.split('\n')
    .map(t => [...t.trim()].map(Number))
    .reduce((sizes, row, y, map) =>
      [...sizes, ...row.reduce((r, c, x) =>
        ((x == 0 || c < row[x - 1])
          && (x == row.length - 1 || c < row[x + 1])
          && (y == 0 || c < map[y - 1][x])
          && (y == map.length - 1 || c < map[y + 1][x])) ? [...r, size(map, [x, y])] : r, [])], [])
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((p, a) => p * a);