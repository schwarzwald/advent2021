module.exports = input =>
  input.split('\n')
    .map(t => t.trim())
    .map(t => t.split(' '))
    .reduce(([h, d, a], [dir, val]) => dir == 'forward' ?
      [h + +val, d + val * a, a] :
      [h, d, a + (dir == 'down' ? +val : -val)], [0, 0, 0])
    .slice(0, 2)
    .reduce((p, c) => p * c);