const decode = (numbers, code) => {
  let digits = new Array(10);

  for (let number of numbers) {
    if (number.length == 2) {
      digits[1] = number;
    } else if (number.length == 3) {
      digits[7] = number;
    } else if (number.length == 4) {
      digits[4] = number;
    } else if (number.length == 7) {
      digits[8] = number;
    }
  }

  for (let number of numbers.filter(c => c.length == 6)) {
    if (!number.includes(digits[1][0])) {
      digits[6] = number;
    } else if (!number.includes(digits[1][1])) {
      digits[6] = number;
    }
  }

  for (let number of numbers.filter(c => c.length == 6 && c != digits[6])) {
    if ([...digits[4]].every(c => number.includes(c))) {
      digits[9] = number;
    } else {
      digits[0] = number;
    }
  }

  for (let number of numbers.filter(c => c.length == 5)) {
    if ([...digits[1]].every(c => number.includes(c))) {
      digits[3] = number;
    } else if ([...number].every(c => digits[9].includes(c))) {
      digits[5] = number;
    } else {
      digits[2] = number;
    }
  }

  return code.map((c, i) => (10 ** (3 - i)) * digits.indexOf(c)).reduce((sum, c) => sum + c);
}

module.exports = input =>
  input.split('\n')
    .map(row => row.trim()
      .split('|')
      .map(section => section.trim()
        .split(' ')
        .map(n => [...n].sort().join(''))))
    .map(c => decode(...c))
    .reduce((sum, a) => sum + a);
