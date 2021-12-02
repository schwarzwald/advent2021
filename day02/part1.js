module.exports = input =>
  input.split('\n')
    .map(t => t.trim())
    .map(t => t.split(' '))
    .reduce(([h, d], [dir, val]) => (dir == 'forward') ?
      [h + +val, d] :
      [h, d + (dir == 'down' ? +val : -val)], [0, 0])
    .reduce((p, c) => p * c);