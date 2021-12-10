const openers = ['(', '[', '{', '<'];
const closers = [')', ']', '}', '>'];
const scores = [1, 2, 3, 4];

module.exports = input => {
  let score = input.split('\n')
    .map(t => t.trim())
    .map(line => {
      let stack = [];

      for (let c of line) {
        if (closers.includes(c)) {
          if (closers.indexOf(c) != openers.indexOf(stack.pop())) {
            stack = [];
            break;
          }
        } else {
          stack.push(c);
        }
      }

      return stack.reverse().reduce((p, o) => 5 * p + scores[openers.indexOf(o)], 0);
    })
    .filter(s => s > 0)
    .sort((a, b) => a - b);

  return score[(score.length - 1) / 2]
}
