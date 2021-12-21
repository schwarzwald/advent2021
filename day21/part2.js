const cardinalities = new Map();
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    for (let k = 1; k <= 3; k++) {
      let sum = i + j + k;
      cardinalities.set(sum, (cardinalities.get(sum) || 0) + 1);
    }
  }
}

const wins = (n, max) => results(n, max, true);
const loss = (n, max) => results(n, max, false);
const results = (n, max, win) => {
  let stack = [[0, n, 0, 0, 1]];
  let result = 0;

  while (stack.length) {
    let [roll, position, length, score, count] = stack.pop();

    if (length > max) {
      continue;
    }

    let newPosition = (position + roll - 1) % 10 + 1;
    let newScore = roll > 0 ? score + newPosition : 0;

    if (length == max && win == (newScore >= 21)) {
      result += count * cardinalities.get(roll);
    } else if (newScore < 21) {
      for (let i = 3; i <= 9; i++) {
        stack.push([i, newPosition, length + 1, newScore, roll > 0 ? count * cardinalities.get(roll) : 1]);
      }
    }
  }

  return result;
}

const totalWins = (p1, p2, offset) => {
  for (let i = 3, total = 0; ; i++) {
    let winnings = wins(p1, i);
    let losses = loss(p2, i - offset);

    total += winnings * losses;

    if (winnings == 0) {
      return total;
    }
  }
}

module.exports = input => {
  let players = input.split(/\r?\n/).map(t => +t.split(':')[1].trim());
  return Math.max(totalWins(players[0], players[1], 1), totalWins(players[1], players[0], 0));
}
