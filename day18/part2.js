const explode = (number, i) => {
  let j = i + 1;
  while (number[j] != ']') {
    j++;
  }

  let [left, right] = number.substring(i + 1, j).split(',').map(Number);

  let leftSide = '';
  let rightSide = '';

  let le = i;
  while (le > 0 && isNaN(number[le])) {
    le--;
  }

  if (le > 0) {
    let ls = le;
    while (!isNaN(number[ls])) {
      ls--;
    }
    leftSide = number.substring(0, ls + 1) + (+number.substring(ls + 1, le + 1) + left) + number.substring(le + 1, i);
  } else {
    leftSide = number.substring(0, i);
  }

  let rs = j;
  while (rs < number.length - 1 && isNaN(number[rs])) {
    rs++;
  }

  if (rs < number.length - 1) {
    let re = rs;
    while (!isNaN(number[re])) {
      re++;
    }
    rightSide = number.substring(j + 1, rs) + (+number.substring(rs, re) + right) + number.substring(re);
  } else {
    rightSide = number.substring(j + 1);
  }

  return leftSide + '0' + rightSide;
}

const split = (number, num, start, end) => {
  return number.substring(0, start) + '[' + Math.floor(num / 2) + ',' + Math.ceil(num / 2) + ']' + number.substring(end);
}

const reduce = number => {
  let reduced = false;

  do {
    reduced = false;

    let depth = 0;
    let splitPosition = null;

    for (let i = 0; i < number.length; i++) {
      if (number[i] == '[') {
        depth++;
      } else if (number[i] == ']') {
        depth--;
      }

      if (depth == 5) {
        number = explode(number, i);
        reduced = true;
        break;
      }

      if (!isNaN(number[i])) {
        let ne = i;
        while (!isNaN(number[ne])) {
          ne++;
        }

        let num = +number.substring(i, ne);
        if (num > 9) {
          if (splitPosition == null) {
            splitPosition = [num, i, ne];
          }
        }

        i = ne - 1;
      }
    }

    if (splitPosition) {
      number = split(number, splitPosition[0], splitPosition[1], splitPosition[2]);
      reduced = true;
    }
  } while (reduced)

  return number;
}

const add = (n1, n2) => reduce('[' + n1 + ',' + n2 + ']');
const magnitude = number => isNaN(number) ? 3 * magnitude(number[0]) + 2 * magnitude(number[1]) : number;


module.exports = input => {
  let numbers = input.split(/\r?\n/).map(t => t.trim());
  let max = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i == j) {
        continue;
      }

      max = Math.max(max, magnitude(JSON.parse(add(numbers[i], (numbers[j])))));
    }
  }

  return max;
}