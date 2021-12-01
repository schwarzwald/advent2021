module.exports = input =>
  input.split('\n')
    .map(Number)
    .reduce((sum, _, i, arr) => i - 2
      && arr[i - 1] + arr[i - 2] + arr[i - 3] < arr[i] + arr[i - 1] + arr[i - 2] ? sum + 1 : sum, 0);