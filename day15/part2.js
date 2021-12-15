const enc = (x, y, size) => size * y + x;
const dec = (xy, size) => [xy % size, Math.floor(xy / size)];
const calcRisk = (x, y, grid) => {
  let r = grid[y % grid.length][x % grid.length] + Math.floor(y / grid.length) + Math.floor(x / grid.length);
  return r > 9 ? r % 9 : r;
}

const push = (val, queue, risks) => {
  let d = risks.get(val);

  for (let i = 0; i < queue.length; i++) {
    if (d <= risks.get(queue[i])) {
      queue.splice(i, 0, val);
      return;
    }
  }

  queue.push(val);
}

module.exports = input => {
  let grid = input.split(/\r?\n/).map(r => r.trim().split('').map(Number));
  let size = 5 * grid.length;
  let risks = new Map().set(0, 0);

  let end = enc(size - 1, size - 1, size);
  let neighbours = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  let queue = [enc(0, 0, size)];

  while (queue.length) {
    let [x, y] = dec(queue.shift(), size);
    let xy = enc(x, y, size)
    let currentRisk = risks.get(xy);

    if (xy == end) {
      return currentRisk;
    }

    for (let [dx, dy] of neighbours) {
      if (x + dx < 0 || x + dx >= size || y + dy < 0 || y + dy >= size) {
        continue;
      }

      let neighbor = enc(x + dx, y + dy, size);
      let neighborRisk = risks.get(neighbor) || Number.MAX_VALUE;
      let risk = calcRisk(x + dx, y + dy, grid);

      if (currentRisk + risk < neighborRisk) {
        risks.set(neighbor, currentRisk + risk);
        push(enc(x + dx, y + dy, size), queue, risks);
      }
    }
  }

  return risks.get(end);
}
