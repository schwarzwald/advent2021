const encode = (x, y) => 10 * y + x;
const decode = p => [p % 10, Math.floor(p / 10)];

module.exports = input => {
  let grid = input.split('\n')
    .map(t => t.trim()
      .split('')
      .map(Number));

  for (let i = 1; ; i++) {
    let count = 0;
    let flash = [];

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        grid[y][x]++;
        if (grid[y][x] == 10) {
          flash.push(encode(x, y));
        }
      }
    }

    while (flash.length) {
      let [x, y] = decode(flash.shift());

      for (let dx of [-1, 0, 1]) {
        for (let dy of [-1, 0, 1]) {
          if (dx == 0 && dy == 0) {
            continue;
          }

          if (x + dx < 0 || x + dx > 9 || y + dy < 0 || y + dy > 9) {
            continue;
          }

          grid[y + dy][x + dx]++;

          if (grid[y + dy][x + dx] == 10) {
            flash.push(encode(x + dx, y + dy));
          }
        }
      }
    }

    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 10; x++) {
        if (grid[y][x] > 9) {
          count++;
          grid[y][x] = 0;
        }
      }
    }

    if (count == 100) {
      return i;
    }
  }
}
