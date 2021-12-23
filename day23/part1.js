const house = new Map().set('A', 0).set('B', 1).set('C', 2).set('D', 3);
const price = new Map().set('A', 1).set('B', 10).set('C', 100).set('D', 1000);
const types = ['A', 'B', 'C', 'D'];

const canGoHome = (hw, from, to) => {
  to = 2 + 2 * to;
  if (from < to) {
    for (let i = from + 1; i <= to; i++) {
      if (hw[i]) {
        return false;
      }
    }
    return true;
  } else {
    for (let i = from - 1; i >= to; i--) {
      if (hw[i]) {
        return false;
      }
    }
    return true;
  }
}

const canGoToHallway = (hw, from, to) => {
  from = 2 + 2 * from;
  if (from < to) {
    for (let i = from + 1; i <= to; i++) {
      if (hw[i]) {
        return false;
      }
    }
    return true;
  } else {
    for (let i = from - 1; i >= to; i--) {
      if (hw[i]) {
        return false;
      }
    }
    return true;
  }
}

const isRoomFinished = (rm, i) => {
  return rm[0] == types[i] && rm[1] == types[i];
}

const isFinished = rooms => {
  for (let i = 0; i < 4; i++) {
    if (!isRoomFinished(rooms[i], i)) {
      return false;
    }
  }
  return true;
}

const id = (hw, rm, score) => {
  let r = score + '#';
  for (let i = 0; i < 11; i++) {
    r += hw[i] ? hw[i] : '.';
  }
  for (let i = 0; i < 4; i++) {
    r += rm[i][0] + '#' + rm[i][1];
  }
  return r;
}

module.exports = input => {
  let rows = input.split(/\r?\n/);

  let hallway = new Array(11);
  let rooms = [
    [rows[2][3], rows[3][3]],
    [rows[2][5], rows[3][5]],
    [rows[2][7], rows[3][7]],
    [rows[2][9], rows[3][9]]
  ];

  let minScore = Number.MAX_VALUE;
  let queue = [[hallway, rooms, 0]];
  let visited = new Set();

  while (queue.length) {
    let [hw, rm, score] = queue.pop();
    let stateid = id(hw, rm, score);

    if (visited.has(stateid)) {
      continue;
    }

    visited.add(stateid);

    if (isFinished(rm)) {
      minScore = Math.min(score, minScore);
      continue;
    }

    if (score >= minScore) {
      continue;
    }

    for (let i = 0; i < 11; i++) {
      let type = hw[i];
      if (type) {
        if (canGoHome(hw, i, house.get(type))) {
          if (!rm[house.get(type)][0]) {
            if (rm[house.get(type)][1] == type) {
              let dist = Math.abs(2 + 2 * house.get(type) - i) + 1;

              let newHw = hw.slice();
              newHw[i] = null;
              let newRooms = rm.map(c => c.slice());
              newRooms[house.get(type)][0] = type;
              queue.push([newHw, newRooms, score + price.get(type) * dist]);
            } else if (!rm[house.get(type)][1]) {
              let dist = Math.abs(2 + 2 * house.get(type) - i) + 2;

              let newHw = hw.slice();
              newHw[i] = null;
              let newRooms = rm.map(c => c.slice());
              newRooms[house.get(type)][1] = type;
              queue.push([newHw, newRooms, score + price.get(type) * dist]);
            }
          }
        }
      }
    }

    for (let i = 0; i < 4; i++) {
      if (!isRoomFinished(rm[i], i)) {
        for (let j = 0; j < 11; j++) {
          if (j == 2 || j == 4 || j == 6 || j == 8) {
            continue;
          }

          if (rm[i][0]) {
            if (canGoToHallway(hw, i, j)) {
              let dist = Math.abs(2 + 2 * i - j) + 1;

              let newHw = hw.slice();
              newHw[j] = rm[i][0];

              let newRooms = rm.map(c => c.slice());
              newRooms[i][0] = null;
              queue.push([newHw, newRooms, score + price.get(rm[i][0]) * dist]);
            }
          } else if (rm[i][1] && rm[i][1] != types[i]) {
            if (canGoToHallway(hw, i, j)) {
              let dist = Math.abs(2 + 2 * i - j) + 2

              let newHw = hw.slice();
              newHw[j] = rm[i][1];

              let newRooms = rm.map(c => c.slice());
              newRooms[i][1] = null;
              queue.push([newHw, newRooms, score + price.get(rm[i][1]) * dist]);
            }
          }
        }

      }
    }
  }

  return minScore;
}
