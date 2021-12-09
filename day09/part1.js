module.exports = input =>
  input.split('\n')
    .map(t => [...t.trim()].map(Number))
    .map((r, i, arr) =>
      r.filter((c, j, row) =>
      ((j == 0 || c < row[j - 1])
        && (j == row.length - 1 || c < row[j + 1])
        && (i == 0 || c < arr[i - 1][j])
        && (i == arr.length - 1 || c < arr[i + 1][j])))
        .reduce((sum, a) => sum + a + 1, 0))
    .reduce((sum, a) => sum + a);