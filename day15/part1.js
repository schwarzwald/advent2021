let enc = (x, y, size) => size * y + x;
let dec = (xy, size) => [xy % size, Math.floor(xy / size)];

module.exports = input => {
  let grid = input.split(/\r?\n/).map(r => r.trim().split('').map(Number));
  let size = grid.length;
  let risks = [0];
  let end = enc(size - 1, size - 1, size);

  let queue = [enc(0, 0, size)];

  while (queue.length) {
    let [x, y] = dec(queue.sort((a, b) => (risks[a] || Number.MAX_VALUE) - (risks[b] || Number.MAX_VALUE)).shift(), size);
    let currentRisk = risks[enc(x, y, size)];

    if (enc(x, y, size) == end) {
      return currentRisk;
    }

    for (let [dx, dy] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      if (x + dx < 0 || x + dx >= size || y + dy < 0 || y + dy >= size) {
        continue;
      }

      let neighbor = enc(x + dx, y + dy, size);

      let neighborRisk = risks[neighbor] || Number.MAX_VALUE;
      let risk = grid[y + dy][x + dx];

      if (currentRisk + risk < neighborRisk) {
        risks[enc(x + dx, y + dy, size)] = currentRisk + risk;
        queue.push(enc(x + dx, y + dy, size));
      }
    }
  }
}
