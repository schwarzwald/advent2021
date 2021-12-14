module.exports = input => {
  let lines = input.split(/\r?\n/);
  let template = lines[0];

  let rules = lines.slice(2)
    .map(c => c.split(' -> ').map(t => t.trim()))
    .reduce((map, [a, b]) => map.set(a, a[0] + b), new Map());

  for (let step = 0; step < 10; step++) {
    template = [...template].map((c, i, arr) => (arr[i + 1]) ? rules.get(c + arr[i + 1]) : c).join('');
  }

  let result = [...template].reduce((counts, c) => counts.set(c, (counts.get(c) || 0) + 1), new Map());
  return Math.max(...result.values()) - Math.min(...result.values());
}
