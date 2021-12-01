module.exports = input =>
  input.split('\n')
    .map(Number)
    .reduce((sum, _, i, arr) => i - 2
      && arr[i - 3] < arr[i] ? sum + 1 : sum, 0);