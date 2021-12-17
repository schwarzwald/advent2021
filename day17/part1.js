module.exports = input => {
  let [, , ymin,] = input.match(/target area: x=(-?\d+)\.\.(-?\d+), y=(-?\d+)..(-?\d+)/).slice(1).map(Number);
  return (-ymin - 1) * (-ymin) / 2;
}
