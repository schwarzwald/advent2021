module.exports = input => {
  let players = input.split(/\r?\n/).map(t => +t.split(':')[1].trim()).map(p => [p, 0]);

  let die = 0;
  let turn = 0;

  while (players[0][1] < 1000 && players[1][1] < 1000) {
    let roll = ++die + ++die + ++die;
    let player = players[turn % 2];
    let position = (((player[0] - 1) + roll) % 10) + 1;

    player[0] = position;
    player[1] += position;
    turn++;
  }

  return Math.min(players[0][1], players[1][1]) * turn * 3;
}
