module.exports = input => {
  let codes = input.split('\n').map(t => t.trim());
  let result = [];
  for (let code of codes) {
    for (let i = 0; i < code.length; i++) {
      result[i] = (result[i] || 0) + +code[i];
    }
  }

  let gamma = '';
  let epsilon = '';
  for (let count of result) {
    let b = count * 2 > codes.length ? 1 : 0;
    gamma += b ? '1' : '0';
    epsilon += b ? '0' : '1';
  }
  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}
