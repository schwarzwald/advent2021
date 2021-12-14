const count = (template, rules, depth, cache) => {
  let id = template + depth;
  if (cache.has(id)) {
    return cache.get(id);
  }

  return cache.set(id, (depth == 1) ?
    [...rules.get(template)].reduce((counts, c) => counts.set(c, (counts.get(c) || 0) + 1), new Map()) :
    countWord(rules.get(template), rules, depth - 1, cache)).get(id);
}

const countWord = (template, rules, depth, cache) =>
  [...template].reduce((counts, c, i, arr) => {
    if (arr[i + 1]) {
      for (let [k, v] of count(c + arr[i + 1], rules, depth, cache).entries()) {
        counts.set(k, (counts.get(k) || 0) + v);
      }
      return counts.set(arr[i + 1], (counts.get(arr[i + 1]) || 0) - 1);
    }
    return counts.set(arr[i], counts.get(arr[i]) + 1);
  }, new Map());

module.exports = input => {
  let lines = input.split(/\r?\n/);
  let template = lines[0];

  let rules = lines.slice(2)
    .map(c => c.split(' -> ').map(t => t.trim()))
    .reduce((map, [a, b]) => map.set(a, a[0] + b + a[1]), new Map());

  let result = countWord(template, rules, 40, new Map());

  return Math.max(...result.values()) - Math.min(...result.values());
}
