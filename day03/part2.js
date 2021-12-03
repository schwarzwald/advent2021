module.exports = input => {
  const reduce = (codes, high, low) => {
    for (let i = 0; i < codes[0].length; i++) {
      let count = codes.reduce((s, c) => s + +c[i], 0);
      let b = count * 2 >= codes.length ? high : low;

      codes = codes.filter(c => c[i] == b);

      if (codes.length == 1) {
        return parseInt(codes[0], 2);
      }
    }
  }

  let codes = input.split('\n').map(t => t.trim());

  return reduce(codes, '1', '0') * reduce(codes, '0', '1');
}
