module.exports = input => {
  let populations = input.split(',')
    .map(Number)
    .reduce((arr, c) => {
      arr[c]++;
      return arr;
    }, [...new Array(9)].map(_ => 0));

  for (let i = 0; i < 256; i++) {
    let newborn = populations.shift();
    populations.push(newborn);
    populations[6] += newborn;
  }

  return populations.reduce((sum, a) => sum + a);
}