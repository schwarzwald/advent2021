const openers = ['(', '[', '{', '<'];
const closers = [')', ']', '}', '>'];
const scores = [3, 57, 1197, 25137];

module.exports = input =>
  input.split('\n').map(t => {
    let stack = [];

    for (let c of t.trim()) {
      if (closers.includes(c)) {
        if (closers.indexOf(c) != openers.indexOf(stack.pop())) {
          return scores[closers.indexOf(c)];
        }
      } else {
        stack.push(c);
      }
    }

    return 0;
  }).reduce((sum, a) => sum + a);
