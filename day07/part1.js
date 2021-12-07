module.exports = input => {
  let crabs = input.split(',').map(Number);

  for (let i = 0, prev = Number.MAX_SAFE_INTEGER; ; i++) {
    let sum = crabs.reduce((sum, c) => sum + Math.abs(c - i), 0);
    if (sum > prev) {
      return prev;
    }
    prev = sum;
  }
}
