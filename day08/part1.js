module.exports = input =>
  input.split('\n')
    .map(t => t.split('|')[1]
      .trim()
      .split(' ')
      .filter(c => [2, 3, 4, 7].includes(c.length)))
    .reduce((sum, a) => sum + a.length, 0);