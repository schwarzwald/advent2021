module.exports = input => {
  let grid = input.split(/\r?\n/)
    .map(r => r.trim()
      .split('')
      .map(c => c != '.' ? c : null));

  let height = grid.length;
  let width = grid[0].length;

  let steps = 0;
  let moved = true;
  while (moved) {
    moved = false;
    steps++;

    grid = grid.map(row => {
      let newRow = [];

      for (let x = 0; x < width; x++) {
        if (row[x] == '>' && row[(x + 1) % width] == null) {
          newRow[x] = null;
          newRow[(x + 1) % width] = '>';
          moved = true;
        } else if (row[x]) {
          newRow[x] = row[x];
        }
      }
      return newRow;
    });

    let next = [...new Array(height)].map(y => []);

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        if (grid[y][x] == 'v' && grid[(y + 1) % height][x] == null) {
          next[y][x] = null;
          next[(y + 1) % height][x] = 'v'
          moved = true;
        } else if (grid[y][x]) {
          next[y][x] = grid[y][x];
        }
      }
    }

    grid = next;
  }

  return steps;
}
