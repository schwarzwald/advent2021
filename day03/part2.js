module.exports = input => {
  const reduce = (codes, high, low) => {
    let reduced = codes.slice();

    for (let i = 0; i < codes[0].length; i++) {
      let count = reduced.reduce((s, c) => s + +c[i], 0);
      let b = count * 2 >= reduced.length ? high : low;

      reduced = reduced.filter(c => c[i] == b);

      if (reduced.length == 1) {
        return parseInt(reduced[0], 2);
      }
    }
  }

  let codes = input.split('\n').map(t => t.trim());

  return reduce(codes, '1', '0') * reduce(codes, '0', '1');
}
