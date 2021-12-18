const isNumber = num => !isNaN(num);
const isSplittable = num => isNumber(num) && num > 9;
const splitNumber = num => [Math.floor(num / 2), Math.ceil(num / 2)];

const split = number => {
  let stack = [number];

  while (stack.length) {
    let num = stack.pop();

    if (isNaN(num[1])) {
      stack.push(num[1]);
    }

    if (isNaN(num[0])) {
      stack.push(num[0]);
    }

    if (isSplittable(num[0])) {
      num[0] = splitNumber(num[0]);
      return true;
    }


    if (isSplittable(num[1])) {
      num[1] = splitNumber(num[1]);
      return true;
    }
  }

  return false;
}

const explode = number => {
  let stack = [[number, 0, 0, null]];

  while (stack.length) {
    let [num, depth, pos, parent] = stack.pop();

    if (depth == 4) {
      let pp = parent[0];
      let ppp = pos;

      let lparentparent = parent;
      let lpos = pos;

      let rparentparent = parent;
      let rpos = pos;

      while (lparentparent && lpos == 0) {
        lpos = lparentparent[1];
        lparentparent = lparentparent[2];
      }
      if (lparentparent) {
        let st = [[lparentparent[0][0], 0, lparentparent[0]]];
        while (st.length) {
          let [x, p, pparent] = st.pop();
          if (isNumber(x)) {
            pparent[p] = x + num[0];
            break;
          }

          st.push([x[0], 0, x]);
          st.push([x[1], 1, x]);
        }
      }

      while (rparentparent && rpos == 1) {
        rpos = rparentparent[1];
        rparentparent = rparentparent[2];
      }
      if (rparentparent) {
        let st = [[rparentparent[0][1], 1, rparentparent[0]]];
        while (st.length) {
          let [x, p, pparent] = st.pop();
          if (isNumber(x)) {
            pparent[p] = x + num[1];
            break;
          }

          st.push([x[1], 1, x]);
          st.push([x[0], 0, x]);
        }
      }

      pp[ppp] = 0;

      return true;
    }

    if (isNaN(num[1])) {
      stack.push([num[1], depth + 1, 1, [num, pos, parent]]);
    }

    if (isNaN(num[0])) {
      stack.push([num[0], depth + 1, 0, [num, pos, parent]]);
    }
  }

  return false;
}

const reduce = number => {
  while (explode(number) || split(number));
  return number;
}

const add = (n1, n2) => reduce([n1, n2]);

const magnitude = (number) => {
  if (isNaN(number)) {
    return 3 * magnitude(number[0]) + 2 * magnitude(number[1]);
  }

  return number;
}

const copy = number => {
  if (isNaN(number)) {
    return number.map(n => copy(n));
  }
  return number;
}

module.exports = input => {
  let numbers = input.split(/\r?\n/).map(t => t.trim());
  let max = 0;

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i == j) {
        continue;
      }

      max = Math.max(max, magnitude(add(eval(numbers[i]), eval(numbers[j]))));
    }
  }

  return max;
}