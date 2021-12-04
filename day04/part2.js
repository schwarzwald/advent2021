module.exports = input => {
  const hasBingo = (board, numbers) => {
    for (let i = 0; i < 5; i++) {
      if (board[i].every(c => numbers.includes(c)) ||
        board.map(r => r[i]).every(c => numbers.includes(c))) {
        return true;
      }
    }
    return false;
  }

  let lines = input.split('\n').map(t => t.trim());
  let numbers = lines[0].split(',').map(Number);
  let boards = [];

  for (let i = 0; i < (lines.length - 1) / 6; i++) {
    boards[i] = [];
    for (let j = 1; j < 6; j++) {
      boards[i][j - 1] = lines[i * 6 + j + 1].match(/(\d+)/g).map(Number);
    }
  }

  for (let i = 5; i <= numbers.length; i++) {
    let sublist = numbers.slice(0, i);

    if (boards.length > 1) {
      boards = boards.filter(b => !hasBingo(b, sublist));
    } else {
      if (hasBingo(boards[0], sublist)) {
        return numbers[i - 1] * boards[0].reduce((s, row) => (s + row.filter(r => !sublist.includes(r)).reduce((sum, a) => sum + a, 0)), 0);
      }
    }
  }
}
