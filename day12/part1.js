module.exports = input => {
  let edges = input.split('\n').map(t => t.trim().split('-'));
  let graph = new Map();

  for (let [a, b] of edges) {
    if (!graph.has(a)) {
      graph.set(a, [b]);
    } else {
      graph.get(a).push(b);
    }

    if (!graph.has(b)) {
      graph.set(b, [a]);
    } else {
      graph.get(b).push(a);
    }
  }

  let count = 0;
  let queue = [['start', []]];

  while (queue.length) {
    let [current, visited] = queue.pop();

    if (current == 'end') {
      count++;
      continue;
    }

    if (current.toUpperCase() != current) {
      if (visited.includes(current)) {
        continue;
      }
    }

    for (let neighbor of (graph.get(current))) {
      queue.push([neighbor, [...visited, current]])
    }
  }

  return count;
}
