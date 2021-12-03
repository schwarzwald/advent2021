module.exports = input => {
  const countBits = arr => {
    let result = [];

    for (let code of arr) {
      for (let i = 0; i < code.length; i++) {
        result[i] = (result[i] || 0) + +code.charAt(i);
      }
    }

    return result;
  }
  let codes = input.split('\n').map(t => t.trim());

  let oxygenCodes = codes.slice();
  for (let i = 0; i < codes[0].length; i++) {
    let counts = countBits(oxygenCodes);
    let x = counts[i] * 2 >= oxygenCodes.length ? '1' : '0';

    oxygenCodes = oxygenCodes.filter(c => c[i] == x);
    if (oxygenCodes.length == 1) {
      break;
    }
  }

  let co2Codes = codes.slice();
  for (let i = 0; i < codes[0].length; i++) {
    let counts = countBits(co2Codes);
    let x = counts[i] * 2 >= co2Codes.length ? '0' : '1';

    co2Codes = co2Codes.filter(c => c[i] == x);
    if (co2Codes.length == 1) {
      break;
    }
  }

  return parseInt(oxygenCodes[0], 2) * parseInt(co2Codes[0], 2);
}
