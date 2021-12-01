module.exports = input =>
  input.split('\n')
    .map(Number)
    .reduce((sum, curr, i, arr) => i && arr[i - 1] < curr ? sum + 1 : sum, 0);