module.exports = input => {
  let vars = { w: 0, x: 0, y: 0, z: 0 };
  let inputs = '96918996924991'.split('').map(Number);
  let instructions = input.split(/\r?\n/);
  for (let instr of instructions) {
    let operands = instr.split(' ');
    let target = operands[1];
    let value = operands.length == 3 ? (isNaN(operands[2]) ? vars[operands[2]] : +operands[2]) : null;

    switch (operands[0]) {
      case 'inp':
        vars[target] = inputs.shift();
        break;
      case 'add':
        vars[target] = vars[target] + value;
        break;
      case 'mul':
        vars[target] = vars[target] * value;
        break;
      case 'div':
        vars[target] = Math.floor(vars[target] / value);
        break;
      case 'mod':
        vars[target] = vars[target] % value;
        break;
      case 'eql':
        vars[target] = vars[target] == value ? 1 : 0;
        break;
    }
  }

  return vars.z == 0;
}
